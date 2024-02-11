const { info } = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  info('Method: ', request.method)
  info('Path: ', request.path)
  info('Body: ', request.body)
  info('---')

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id',name: error.name })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message, name: error.name})
  } else if(error.name === 'TypeError') {
    return response.status(400).json({ error: error.message, name: error.name })
  } else if( error.name === "MongoServerError"){
    return response.status(400).json({ error: error.message, name: error.name })
  } else if( error.name === 'Error'){
    return response.status(400).json({ error: error.message, name: error.name })
  } else if( error.name === 'TokenExpiredError'){
    return response.status(400).json({ error: error.message, name: error.name })
  } else if( error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: "Token must be provided"})
  }


  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, SECRET)
  if(!decodedToken._id){
    response.status(401).json({error: "Invalid token"})
  }

  request.user = await User.findById(decodedToken._id)

  next()
}

module.exports = { requestLogger, errorHandler, unknownEndpoint, tokenExtractor, userExtractor }