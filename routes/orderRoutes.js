const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/Order');


router.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save(); 
    res.status(201).json({ message: 'Order placed!', order: savedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
});



router.get('/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID format' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});


module.exports = router;
