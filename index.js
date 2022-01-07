const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectionToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler } = require('./utils/middleware')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

const start = async () => {
  await connectionToDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start()