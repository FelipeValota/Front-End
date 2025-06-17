const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  totalPrice: Number,
  status: { type: String, default: 'pendente' },
  paidAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
