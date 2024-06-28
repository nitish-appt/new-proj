import { AuthChecker } from 'type-graphql';
import { JwtPayload } from "jsonwebtoken";
import _ from "lodash-es";
import { Context, Maybe } from "../types.js";
import { logger, messages, verifyJwt } from "../utils/index.js";




export const authChecker: AuthChecker<Context> = ({ context }) => {
  try {
    if (context && _.hasIn(context, "req.req.headers.authorization")) {
      const data: Maybe<string | JwtPayload> = verifyJwt(
        context.req.req.headers.authorization as string
      );
      if (data) {
        return true;
      }
    }

    return false;
  } catch (error: any) {
    if (error.message.includes("invalid token")) {
      logger.error(error);
      throw new Error(messages.UNAUTHORISED_ERR_MSG);
    }
    return false;
  }
};