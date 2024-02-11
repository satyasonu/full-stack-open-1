const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const {initialUser} = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany()
  await api
  .post('/api/users')
  .send(initialUser)
})

describe('create token', () => {
  test('successfull if valid data', async () => {
  const userData = {
    username: initialUser.username,
    password: initialUser.password
  }
   const res = await api.post('/api/login').send(userData)
   expect(res.status).toEqual(200)
   expect(res.body.token).toBeDefined()
  })
})