import dotenv from 'dotenv';
import { nanoid } from "nanoid";

dotenv.config();
export const config = {
  port: process.env.API_PORT || 4000,
  host: process.env.API_HOST || "localhost",
  isDevEnv: (process.env.API_NODE_ENV || "development") === "development",
  validate: (process.env.API_VALIDATE || "false") === "true",
  database: {
    name: process.env.API_DB_NAME || "",
    username: process.env.API_DB_USR_NAME || "",
    password: process.env.API_DB_PASSWD || "",
    port: process.env.API_DB_PORT || "",
    host: process.env.API_DB_HOST || "",
    shouldSeed: process.env.API_DB_SEED === "true",
    shouldDropSchema: process.env.API_DB_DROP_SCHEMA === "true",
    entityPattern:
      process.env.API_DB_ENTITY_PATTERN || './src/entities/**/*-entity.ts',
    migrationPattern:
      process.env.API_DB_MIGRATION_PATTERN || './src/migrations/**/*.ts',
    migrationAutoRun:
      process.env.API_DB_MIGRATION_AUTO_RUN === "true" &&
      process.env.API_DB_DROP_SCHEMA === "true",
    migrationTableName:
      process.env.API_DB_MIGRATION_TABLE_NAME || "migration",
  },
  sessionSecret: process.env.API_SESSION_SECRET || nanoid(), 
  logger: {
    logLevel: process.env.LOG_LEVEL,
    label: process.env.LABEL,
    filename: process.env.LOG_FILENAME,
    directory: process.env.LOG_DIRECTORY,
    datePattern: process.env.LOG_DATE_PATTERN,
    frequency: process.env.LOG_FREQUENCY,
    maxFiles: process.env.LOG_MAX_FILES,
    maxSizes: process.env.LOG_MAX_SIZE,
  },
       
};
