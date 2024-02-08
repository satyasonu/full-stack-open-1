const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users', {"username": 1, "name": 1})
  response.json(blogs)
})



blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, SECRET)
  console.log(decodedToken._id)
  if(!decodedToken._id){
    return response.status(401).json({error: "Invalid token"})
  }
  const user = await User.findById(decodedToken._id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    users: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(204).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findByIdAndUpdate(id, request.body, {new: true})

  response.status(201).json(result)
})

module.exports = blogsRouter
