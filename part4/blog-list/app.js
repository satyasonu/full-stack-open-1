const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const { info, error } = require('./utils/logger')
const { mongoUrl } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { requestLogger, errorHandler, unknownEndpoint, tokenExtractor } = require('./utils/middleware')

mongoose.connect(mongoUrl)
  .then(() => {
    info('Connected to DB')
  })
  .catch((err) => {
    error('Error while connecting to DB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app