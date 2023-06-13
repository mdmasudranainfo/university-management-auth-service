//

import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserService } from '../modules/users/user.service'
import { AnyZodObject } from 'zod'

//
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      // catch Error
    } catch (error) {
      next(error)
    }
  }
export default validateRequest
