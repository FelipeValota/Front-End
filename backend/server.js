require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => res.send('API Online'))

if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(5000, () => console.log('Servidor rodando na porta 5000'))
  }).catch(err => console.error(err))
} else {
  mongoose.connect(process.env.MONGO_URI)
}

module.exports = app
