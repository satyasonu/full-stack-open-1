const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const { initialBlogs, blogsIndb } = require('./test_helper')

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

test('new blog added to the list', async () => {
  const newBlog = {
    title:'Typescript blog',
    author:'Chandan Sahoo',
    url:'http://typescript.com',
    likes: 55
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await blogsIndb()

  expect(blogs).toHaveLength(initialBlogs.length + 1)

  const titles = blogs.map(blog => blog.title)

  expect(titles).toContain(newBlog.title)

})

test('missing likes property value is 0', async () => {
  const newBlog = {
    title:'Typescript blog',
    author:'Chandan Sahoo',
    url:'http://typescript.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const blogs = await blogsIndb()

  expect(blogs).toHaveLength(initialBlogs.length + 1)

  const findblog = blogs.find(blog => blog.title === newBlog.title)

  expect(findblog.likes).toEqual(0)
})

test('title or url is missing response as 400', async () => {
  const newBlog = {
    title:'Typescript blog',
    author:'Chandan Sahoo',
    likes: 69
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogAtStart = await blogsIndb()

    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsIndb()

    expect(blogsAtEnd).toHaveLength(blogAtStart.length - 1)

    const titles = blogsAtEnd.map(blog =>  blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('Failed with status 400 if id is not valid', async () => {
    const blogAtStart = await blogsIndb()

    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}36678`)
      .expect(400)
  })
})

describe('updation of individual blog', () => {
  test('succeeds with 201 if id is valid', async () => {
    const newLikes = {
      likes: 56
    }

    const blogsAtStart = await blogsIndb()

    const blogsToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send(newLikes)
      .expect(201)

    const blogsAtEnd = await blogsIndb()

    const individualObject = blogsAtEnd.find(blog => blogsToUpdate.id === blog.id)

    expect(individualObject.likes).toEqual(newLikes.likes)
  })
  test('Fails with 400 if id is not valid', async () => {
    const newLikes = {
      likes: 56
    }

    const blogsAtStart = await blogsIndb()

    const blogsToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogsToUpdate.id}65464`)
      .send(newLikes)
      .expect(400)
  })
})