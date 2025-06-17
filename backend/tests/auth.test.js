const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../models/User')

let app

let server
let mongo

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongo.getUri()
  process.env.JWT_SECRET = 'test'
  app = require('../server')
  server = app.listen(0)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
  server.close()
})

test('registro e login', async () => {
  const user = { name: 'Teste', email: 't@e.com', password: '123456' }
  await request(server).post('/api/auth/register').send(user).expect(201)
  const res = await request(server).post('/api/auth/login').send({ email: user.email, password: user.password }).expect(200)
  expect(res.body.token).toBeDefined()
})
