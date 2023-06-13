import config from '../../config';
import { iGenerecMessage } from '../../errors/error';
import { handleValidationError } from '../../errors/handleValidationError';
import { iGenerecErrorResponse } from '../../interfaces/common';
import ApiError from '../../errors/ApiError';
import { ErrorRequestHandler } from 'express';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

// type

//
let statusCode = 400;
let message = 'something went wrong';
let errorMessage: iGenerecMessage[] = [];

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //
  config.env == 'development'
    ? console.log('global error handler', error)
    : errorLogger.error('global error handler', error);
  //
  if (error?.name === 'ValidationError') {
    const simpleFieldError: iGenerecErrorResponse =
      handleValidationError(error);
    statusCode = simpleFieldError.statusCode;
    message = simpleFieldError.message;
    errorMessage = simpleFieldError.errorMessage;
  }
  // zod error
  else if (error instanceof ZodError) {
    const simplefiedError = handleZodError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessage;
  }
  // api error
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  //
  else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  //
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next(error);
};

export default globalErrorHandler;
