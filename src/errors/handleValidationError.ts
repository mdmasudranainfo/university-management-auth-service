import mongoose from 'mongoose'
import { iGenerecErrorResponse } from '../interfaces/common'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): iGenerecErrorResponse => {
  const errors = Object.values(err.errors).map(el => {
    return {
      path: el.path ?? null,
      message: el.message ?? null,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  }
}
