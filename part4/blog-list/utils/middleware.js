const { info } = require('./logger')

const requestLogger = (request, response, next) => {
  info('Method: ', request.method)
  info('Path: ', request.path)
  info('Body: ', request.body)
  info('---')

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'TypeError') {
    return response.status(400).json({ error: error.message })
  } else if( error.name === "MongoServerError"){
    return response.status(400).json({ error: error.message })
  } else if( error.name === 'Error'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { requestLogger, errorHandler, unknownEndpoint }