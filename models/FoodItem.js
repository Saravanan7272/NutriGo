const mongoose = require('mongoose');

const CustomizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [{ type: String, required: true }]
}, { _id: false });

const FoodItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['starter', 'main', 'dessert', 'fastfood'],
    required: true
  },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  isVegetarian: { type: Boolean, default: false },
  customizations: [CustomizationSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
