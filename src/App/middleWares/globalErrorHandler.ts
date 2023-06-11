import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { iGenerecMessage } from '../../errors/error'
import { handleValidationError } from '../../errors/handleValidationError'
import { iGenerecErrorResponse } from '../../interfaces/common'
import { error } from 'console'
import ApiError from '../../errors/ApiError'

// type

//
let statusCode = 400
let message = 'something went wrong'
let errorMessage: iGenerecMessage[] = []

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err?.name === 'ValidationError') {
    const simpleFieldError: iGenerecErrorResponse = handleValidationError(err)
    statusCode = simpleFieldError.statusCode
    message = simpleFieldError.message
    errorMessage = simpleFieldError.errorMessage
  }
  // api error
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  //
  else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  //
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next(err)
}

export default globalErrorHandler
