const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectionToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingRouter = require('./controllers/readinglists')
const { errorHandler } = require('./utils/middleware')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingRouter)

app.use(errorHandler)

const start = async () => {
  await connectionToDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start()