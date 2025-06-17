const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Product = require('../models/Product')

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

test('lista produtos', async () => {
  await Product.create({ name: 'Produto Teste', price: 10 })
  const res = await request(server).get('/api/products').expect(200)
  expect(res.body.length).toBe(1)
})
