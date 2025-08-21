const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes') // ✅ Moved to the top
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes');

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Routes
app.get('/', (req, res) => {
  res.send('API running...')
})
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes);

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes) // ✅ Make sure this line comes before app.listen

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
