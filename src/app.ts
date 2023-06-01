import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()
import usersRouter from './app/modules/users/users.route'

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Application routes
app.use('/api/v1/users/', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
