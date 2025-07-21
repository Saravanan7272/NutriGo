const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  cuisine: [{ type: String, required: true }], // Multi-cuisine
  rating: { type: Number, min: 0, max: 5, default: 3.5 },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  images: [{ type: String }], // Multiple image URLs
  openHours: { type: String }, // Example: "9:00 AM - 10:00 PM"
  minOrderAmount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
