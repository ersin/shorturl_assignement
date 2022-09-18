import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError.Model';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'System Error'
    );
  }

  // we are not using the next function to prvent from triggering the default error handler. 
  res.status((customError as CustomError).status).send(customError);
};

export default handleError;