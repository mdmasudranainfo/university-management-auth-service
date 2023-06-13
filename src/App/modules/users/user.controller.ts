//

import { RequestHandler } from 'express'
import { UserService } from './user.service'

//
const createUse: RequestHandler = async (req, res, next) => {
  try {
    // start
    const { user } = req.body
    const result = await UserService.createUserDB(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
    // end

    // catch Error
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUse,
}
