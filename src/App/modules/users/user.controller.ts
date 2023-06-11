//

import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

//
const createUse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // start
    const { user } = req.body
    const result = await userService.createUserDB(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
    // end

    // catch Error
  } catch (err) {
    next(err)
  }
}

export default {
  createUse,
}
