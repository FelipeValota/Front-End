const router = require('express').Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const { protect, admin } = require('../middleware/auth')

// Criar pedido
router.post('/', protect, async (req, res) => {
  const items = await Promise.all(req.body.items.map(async i => ({
    product: i.product,
    quantity: i.quantity
  })))
  const totalPrice = await items.reduce(async (sumP, i) => {
    const product = await Product.findById(i.product)
    return (await sumP) + product.price * i.quantity
  }, Promise.resolve(0))
  const order = await Order.create({ user: req.user.id, items, totalPrice, paidAt: new Date() })
  res.status(201).json(order)
})

// Pedidos do usuário
router.get('/mine', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product')
  res.json(orders)
})

// Admin: listar todos
router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product')
  res.json(orders)
})

// Admin: atualizar status
router.put('/:id', protect, admin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(order)
})

module.exports = router
