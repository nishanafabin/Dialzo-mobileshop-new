const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      image: String,
      price: Number,
      quantity: {
        type: Number,
        min: 1
      }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
