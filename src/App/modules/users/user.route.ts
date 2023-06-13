import express from 'express'
import { UserController } from './user.controller'
import { userValidation } from './user.validation'
import validateRequest from '../../middleWares/validateRequest'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(userValidation.createUserZodShema),
  UserController.createUse
)

export const UserRouter = router
