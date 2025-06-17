const router = require('express').Router()
const Product = require('../models/Product')
const { protect, admin } = require('../middleware/auth')

// Listagem com filtros
router.get('/', async (req, res) => {
  const { category, name, min, max } = req.query
  const filter = {}
  if (category) filter.category = category
  if (name) filter.name = new RegExp(name, 'i')
  if (min || max) filter.price = { ...(min && { $gte: Number(min) }), ...(max && { $lte: Number(max) }) }
  const products = await Product.find(filter)
  res.json(products)
})

// Detalhes de produto
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' })
  res.json(product)
})

// Rotas de administração
router.post('/', protect, admin, async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
})

router.put('/:id', protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(product)
})

router.delete('/:id', protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = router
