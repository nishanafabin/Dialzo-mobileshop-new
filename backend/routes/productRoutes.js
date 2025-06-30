// backend/routes/productRoutes.js
const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// POST create product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.status(201).json(newProduct)
})
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete product' })
  }
})

// server/routes/productRoutes.js or similar
// Update product by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error })
  }
})


module.exports = router
