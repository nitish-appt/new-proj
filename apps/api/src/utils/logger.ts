import { config } from "./index.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { colorize, combine, timestamp, label, printf, errors } = winston.format;
const messageFormat = printf((info: any) => {
  return `[${info.timestamp}] ${info.label} [${info.level}]: ${info.message}`;
});

let formatConfig: winston.Logform.Format | undefined;

if (config.logger.logLevel === "debug") {
  formatConfig = combine(
    label({ label: config.logger.label }),
    timestamp(),
    errors({ stack: true }),
    winston.format.prettyPrint()
  );
} else {
  formatConfig = combine(
    label({ label: config.logger.label }),
    timestamp(),
    errors({ stack: true }),
    winston.format.simple()
  );
}

// TODO: support for log type
// const logType = config.logger.type || 'rotating';

const logger = winston.createLogger({
  level: config.logger.logLevel,
  format: formatConfig,

  transports: [
    new winston.transports.Console({
      level: config.logger.logLevel,
      format: combine(
        label({ label: config.logger.label }),
        timestamp(),
        colorize({ all: true }),
        messageFormat
      ),
    } as any),
    new DailyRotateFile({
      datePattern: config.logger.datePattern,
      dirname: config.logger.directory,
      filename: config.logger.filename,
      frequency: config.logger.frequency,
      maxFiles: config.logger.maxFiles,
      maxSize: config.logger.maxSizes,
      utc: true,
      zippedArchive: true,
    }),
  ],
});

export { logger };
