import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config, SnakeNamingStrategy } from '../utils/index.js';

const AppDataSource = new DataSource({
    type: 'postgres',
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
    port: Number(config.database.port),
    host: config.database.host,
    entities: [config.database.entityPattern],
    synchronize: true,
    logger: 'advanced-console',
    logging: config.isDevEnv ? 'all' : false,
    dropSchema: config.database.shouldDropSchema,
    cache: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [config.database.migrationPattern],
    migrationsTableName: config.database.migrationTableName,
});

export { AppDataSource };
