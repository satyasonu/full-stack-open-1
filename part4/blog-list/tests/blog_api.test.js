const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
      title:'React Blogs',
      author:'Satyabrata Sahoo',
      url:'http://blog.react.com',
      likes:10
    },
    {
      title:'Tailwind blog',
      author:'Balabanta Sahoo',
      url:'http://tailwind.com',
      likes: 25
    }
]

beforeEach( async () => {
    await Blog.deleteMany()
    await Blog.insertMany(initialBlogs)
})

test('blogs length is two', async () => {
   const response =  await api.get('/api/blogs')

   expect(response.body).toHaveLength(initialBlogs.length)
      
})

test('Unique identifier named as id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})