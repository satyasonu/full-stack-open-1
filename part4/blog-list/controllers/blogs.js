const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users', {"username": 1, "name": 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
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
  console.log(savedBlog)
  const newBlog = await Blog.findOne({title: savedBlog.title}).populate('users').exec()
  
  response.status(201).json(newBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('users', {"username": 1, "name": 1})
  response.json(blog)
})

blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  const user = request.user
  if(blog.users.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
    
  } else {
    response.status(401).json({error: "Unauthorized user"})
  }
  
})


blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findByIdAndUpdate(id, request.body, {new: true})

  response.status(201).json(result)
})

module.exports = blogsRouter
