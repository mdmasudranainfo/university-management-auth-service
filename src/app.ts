import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './App/middleWares/globalErrorHandler'
import { UserRouter } from './App/modules/users/user.route'
import ApiError from './errors/ApiError'

// import ApiError from './errors/ApiError'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route Definition
app.use('/api/v1/user', UserRouter)

app.get('/', async (req: Request, res: Response) => {
  throw new Error('testing error')
})
// global error handler
app.use(globalErrorHandler)

export default app
