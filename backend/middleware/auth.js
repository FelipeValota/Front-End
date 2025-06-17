const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Não autorizado' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

function admin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Acesso negado' })
  next()
}

module.exports = { protect, admin }
