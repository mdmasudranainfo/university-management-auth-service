import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './App/modules/users/user.route'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route Definition
app.use('/api/v1/user', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
