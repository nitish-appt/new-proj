import { ApolloServer } from '@apollo/server';
import { expressMiddleware, ExpressContextFunctionArgument, } from '@apollo/server/express4';
import cors from 'cors';
import express, { json } from 'express';
import "reflect-metadata";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { AppDataSource } from "./db/index.js";
import { ErrorInterceptor } from "./interceptors/index.js";
import { getFormattedError } from "./models/index.js";
import { resolvers as Resolvers } from "./resolvers/index.js";
import { messages, config, logger,  } from "./utils/index.js";
import { ApolloServerContext } from "./types.js";
import session from "express-session";
import { authChecker , authMiddleware} from "./middlewares/index.js";
 

async function main() {
  try {
    const app: express.Express = express();
    const graphqlPath = "/graphql";
    const memoryStore: session.MemoryStore = new session.MemoryStore();

    app.use(
      session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );

 
   
    app.use(graphqlPath,  authMiddleware); 
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: Resolvers,
      authChecker: authChecker,
      globalMiddlewares: [ErrorInterceptor],
      validate: config.validate,
    });

    const server: ApolloServer<ApolloServerContext> = 
      new ApolloServer<ApolloServerContext>({
        typeDefs: [ typeDefs],
         
        resolvers: {
          ...resolvers,
        },
        uploads: false,
        debug: false,
        formatError: getFormattedError,
      } as any);

    await server.start();
     
    app.use(
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
      
            context: async (req: ExpressContextFunctionArgument) => {
        return { req };
      },
      })
    );

    app.listen({ port: config.port }, () =>
      logger.info(
        `🚀 Server ready at http://${config.host}:${config.port}${graphqlPath}`
      )
    );
  } catch (err: any) {
    logger.error(err);
  }
}



await AppDataSource.initialize()
  .then(async () => {
    logger.info(messages.DB_INIT_OK_MSG);

    if (config.database.migrationAutoRun) {
      await AppDataSource.runMigrations({ transaction: "all" });
      logger.info(messages.DB_MIG_OK_MSG);
    }

    await main();


  })
  .catch((err: any) => {
    logger.error(messages.DB_INIT_FAIL_MSG, err);
  });