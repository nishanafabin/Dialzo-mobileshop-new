const express = require('express')
const cors = require('cors')

const app = express()
const url = process.env.REACT_APP_ENDPOINT_URL;
app.use(cors({ origin: `${url}`, credentials: true }))
app.use(express.json())

// In-memory demo data
const generateId = () => Math.random().toString(36).slice(2, 10)

let products = [
  {
    _id: 'p1',
    name: 'iPhone 15',
    price: 79999,
    image: 'https://via.placeholder.com/400x300?text=iPhone+15',
    category: 'Apple',
    description: 'Latest Apple iPhone with A16 Bionic.'
  },
  {
    _id: 'p2',
    name: 'Samsung Galaxy S23',
    price: 69999,
    image: 'https://via.placeholder.com/400x300?text=Galaxy+S23',
    category: 'Samsung',
    description: 'Flagship Samsung with great camera.'
  },
  {
    _id: 'p3',
    name: 'OnePlus 12',
    price: 55999,
    image: 'https://via.placeholder.com/400x300?text=OnePlus+12',
    category: 'OnePlus',
    description: 'Fast and smooth experience.'
  }
]

let cart = []
let orders = []

// Auth (mock)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body || {}
  return res.json({
    token: 'demo-token',
    user: { _id: 'u1', name: 'Demo User', email: email || 'demo@example.com', role: 'user' }
  })
})

app.post('/api/auth/register', (req, res) => {
  return res.status(201).json({ message: 'Registered successfully' })
})

// Products
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
})

// Cart
app.get('/api/cart', (req, res) => {
  res.json(cart)
})

app.post('/api/cart', (req, res) => {
  const { productId, name, image, price, quantity } = req.body || {}
  if (!productId) return res.status(400).json({ message: 'productId is required' })
  const existing = cart.find(i => i.productId === productId)
  if (existing) {
    existing.quantity = typeof quantity === 'number' ? quantity : existing.quantity
  } else {
    cart.push({ productId, name, image, price, quantity: quantity || 1 })
  }
  res.status(200).json({ message: 'Cart updated', cart })
})

app.delete('/api/cart/:id', (req, res) => {
  const before = cart.length
  cart = cart.filter(i => i.productId !== req.params.id)
  if (cart.length === before) return res.status(404).json({ message: 'Item not found' })
  res.json({ message: 'Item removed', cart })
})

app.delete('/api/cart', (req, res) => {
  const newOrder = {
    _id: generateId(),
    createdAt: new Date().toISOString(),
    status: 'Pending',
    items: cart.map(i => ({ ...i }))
  }
  orders.push(newOrder)
  cart = []
  res.json({ message: 'Order placed', order: newOrder })
})

// Orders
app.get('/api/orders/my-orders', (req, res) => {
  res.json(orders)
})

// Admin
app.get('/api/admin/orders', (req, res) => {
  res.json(orders)
})

app.put('/api/admin/orders/:orderId/status', (req, res) => {
  const { status } = req.body || {}
  const order = orders.find(o => o._id === req.params.orderId)
  if (!order) return res.status(404).json({ message: 'Order not found' })
  order.status = status || order.status
  res.json({ message: 'Status updated', order })
})

app.delete('/api/admin/orders/:orderId', (req, res) => {
  const before = orders.length
  orders = orders.filter(o => o._id !== req.params.orderId)
  if (orders.length === before) return res.status(404).json({ message: 'Order not found' })
  res.json({ message: 'Order deleted' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}/api`)
})



