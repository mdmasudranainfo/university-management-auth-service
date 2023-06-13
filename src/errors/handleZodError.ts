import { ZodError, ZodIssue } from 'zod';
import { iGenerecErrorResponse } from '../interfaces/common';
import { iGenerecMessage } from './error';

const handleZodError = (error: ZodError): iGenerecErrorResponse => {
  const errors: iGenerecMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleZodError;
