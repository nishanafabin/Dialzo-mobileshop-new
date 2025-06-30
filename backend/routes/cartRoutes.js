const express = require('express')
const router = express.Router()
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')

// GET /cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user.cart || [])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /cart - add/update single item
router.post('/', authMiddleware, async (req, res) => {
  const { productId, name, image, price, quantity } = req.body

  if (!productId) return res.status(400).json({ message: 'productId is required' })
  if (quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' })

  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (!user.cart) user.cart = []

    // Find if item already exists - convert ObjectIds to strings for comparison
    const existingItem = user.cart.find(item => item.productId.toString() === productId)
    if (existingItem) {
      existingItem.quantity = quantity
    } else {
      user.cart.push({ productId, name, image, price, quantity })
    }

    await user.save()
    res.json(user.cart)
  } catch (err) {
    console.error('Error in POST cart route:', err);
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /cart/:productId - remove single item
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    console.log('Delete request received for productId:', req.params.productId);
    console.log('User ID:', req.userId);
    
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    console.log('User cart before deletion:', user.cart);
    
    // Convert ObjectIds to strings for comparison
    user.cart = (user.cart || []).filter(item => item.productId.toString() !== req.params.productId)
    
    console.log('User cart after deletion:', user.cart);
    
    await user.save()
    res.json(user.cart)
  } catch (err) {
    console.error('Error in delete route:', err);
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /cart - clear entire cart
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.cart = []
    await user.save()
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
