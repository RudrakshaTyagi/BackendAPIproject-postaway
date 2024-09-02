import winston from "winston";

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.File({ filename: 'req.logs' })],
});

export const loggerMiddleware = (req, res, next) => {

  const logData = `${req.url}-${JSON.stringify(req.body)}`;
  logger.info(logData);
  
  next();
};
export default loggerMiddleware;


