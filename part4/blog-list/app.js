const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { info, error } = require('./utils/logger')
const { mongoUrl } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const requestLogger = require('./utils/middleware')

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

module.exports = app