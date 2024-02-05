const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require("express-async-errors")
const { info, error } = require('./utils/logger')
const { mongoUrl } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')

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

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app