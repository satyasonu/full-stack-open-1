const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:"React Blogs",
    author:"Satyabrata Sahoo",
    url:"http://blog.react.com",
    likes:10
  },
  {
    title:"Tailwind blog",
    author:"Balabanta Sahoo",
    url:"http://tailwind.com",
    likes: 25
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test(`blogs are returned as json`, async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is about React', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('React Blogs')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')


  expect(response.body).toHaveLength(initialBlogs.length)
})


test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')


  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Tailwind blog'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})