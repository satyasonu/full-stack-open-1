const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  if(password === undefined){
    return response.status(400).json({error: "password is required"})
  } else if(password.length <= 3){
    return response.status(400).json({error: `username (${password}) is shorter than the minimum allowed length (3).`})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  await newUser.save()
  response.status(201).json(newUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {"title": 1, "author": 1, "url": 1, "likes": 1})

  response.json(users)
})

module.exports = userRouter