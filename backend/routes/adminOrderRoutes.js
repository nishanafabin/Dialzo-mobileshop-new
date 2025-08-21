const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET all orders
router.get('/', auth, async (req, res) => {
  try {
    // Make sure user is admin
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find().populate('userId', 'email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update order status
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Order status updated' });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an order
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
