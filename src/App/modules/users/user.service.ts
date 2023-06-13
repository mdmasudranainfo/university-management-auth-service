import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateId } from './user.utilis'

//
export const createUserDB = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateId()
  user.id = id
  // default Password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'failed to create user')
  }
  return createdUser
}

export const UserService = {
  createUserDB,
}
