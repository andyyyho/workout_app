const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

connectDB()

app.use(cors({credentials: true, origin: 'http://localhost:3001'}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded( {extended: false } ))
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))

