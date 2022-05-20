const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db/mongoose')
const app = express()
const userRouter = require('./routers/userRouter')

connectDB()

app.use(express.json())
app.use(express.urlencoded( {extended: false } ))
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))

