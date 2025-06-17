require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  { name: 'Camiseta React', description: 'Estampa legal', price: 49.9, category: 'roupas' },
  { name: 'Mouse Gamer', description: '2000 DPI', price: 99.9, category: 'perifericos' },
  { name: 'Teclado Mecânico', description: 'Switch azul', price: 199.9, category: 'perifericos' },
  { name: 'Monitor 24"', description: 'Full HD', price: 899.9, category: 'monitores' },
  { name: 'Headset', description: 'Som potente', price: 149.9, category: 'perifericos' },
  { name: 'Camiseta Node.js', description: 'Para devs', price: 59.9, category: 'roupas' },
  { name: 'Notebook i5', description: 'Para trabalho', price: 2999.9, category: 'computadores' },
  { name: 'Smartphone X', description: '128GB', price: 1999.9, category: 'celulares' },
  { name: 'Carregador Rápido', description: 'USB-C', price: 79.9, category: 'acessorios' },
  { name: 'Cadeira Gamer', description: 'Confortável', price: 899.9, category: 'moveis' }
]

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce'
mongoose.connect(uri).then(async () => {
  await Product.deleteMany()
  await Product.insertMany(products)
  console.log('Produtos inseridos')
  mongoose.disconnect()
}).catch(err => console.error(err))
