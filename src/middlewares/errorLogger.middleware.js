import winston from "winston";

export const logger = winston.createLogger({
  
  level: 'error',
  format: winston.format.json(),
  defaultMeta: {
    service: 'error-logging',
  },
  transports:[new winston.transports.File({filename:'error.logs'})]
});

export default logger
