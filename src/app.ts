import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './App/modules/users/user.route'
import globalErrorHandler from './App/middleWares/globalErrorHandler'
// import ApiError from './errors/ApiError'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route Definition
app.use('/api/v1/user', userRouter)

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello World!')
//   throw new ApiError(4000, 'internal error')
// })
// global error handler
app.use(globalErrorHandler)

export default app
