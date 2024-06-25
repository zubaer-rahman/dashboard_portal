// src/config/logger.ts
import morgan from 'morgan';
import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

// Custom format for winston
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a winston logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ],
});

// Setup morgan to use winston for logging HTTP requests
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
});

export { logger, morganMiddleware };
