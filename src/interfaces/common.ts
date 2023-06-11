import { iGenerecMessage } from '../errors/error'

export type iGenerecErrorResponse = {
  statusCode: number
  message: string
  errorMessage: iGenerecMessage[]
}
