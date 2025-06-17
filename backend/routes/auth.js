const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }
  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
  res.json({ token, user: { id: user._id, name: user.name, isAdmin: user.isAdmin } })
})

module.exports = router
