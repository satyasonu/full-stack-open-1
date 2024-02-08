const User = require('../models/user')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({error: "Invalid username or password"})
  }

  const userToken = {
    username: username,
    _id: user.id
  }
  const token = jwt.sign(userToken, SECRET, {expiresIn: 60*60})
  response.status(200).send({token, username: username, name: user.name})
})

module.exports = loginRouter