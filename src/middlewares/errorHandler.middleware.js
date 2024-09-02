import logger from "./errorLogger.middleware.js";

export class customErrorHandler extends Error {
      constructor(statusCode, errMessage) {
        super(errMessage);
        this.statusCode = statusCode;
        this.errMessage = errMessage;
      }
    }
    
export const errorHandlerMiddleware = (err, req, res, next) => {
  const timestamp = new Date().toString();

  const logdata = `{"timestamp": "${timestamp}", "request URL": "${req.url}",
    'error message': "${err.message}"}`;
  
  if (err instanceof customErrorHandler) {
    logger.error(logdata);
    return res.status(err.statusCode).send(err.errMessage);
  } else {
    logger.error(logdata);
    res.status(500).send("Oops! Something went wrong... Please try again later!");
  }
  next();
};
    