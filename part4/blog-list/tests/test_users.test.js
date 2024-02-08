const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
})

describe('add a new user', () => {
  test('succeed if valid user data', async () => {
    const newUser = {
      username: "Sonu",
      name: "S Satya",
      password: "Sonu"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('content-type', /application\/json/)
    const users = await User.find({})

    expect(users).toHaveLength(1)
    const names = users.map(user => user.name)
    expect(names).toContain(newUser.name)
  })
  test('fails if username length is shorter than 3', async () => {
    const newUser = {
      username: "So",
      name: "S Satya",
      password: "Sonu"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)
  })
  test('fails if password length is shorter than 3', async () => {
    const newUser = {
      username: "Sonu",
      name: "S Satya",
      password: "So"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)
  })
  test('fails if username is missing', async () => {
    const newUser = {
      name: "S Satya",
      password: "Sonu"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)
  })
  test('fails if password is missing', async () => {
    const newUser = {
      username: "Sonu",
      name: "S Satya"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)
  })
})