const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String
    }
  ],
  deliveryInfo: {
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String
  },
  total: Number,
  status: {
    type: String,
    enum: ['Processing', 'Preparing', 'On the way', 'Delivered'],
    default: 'Processing'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
