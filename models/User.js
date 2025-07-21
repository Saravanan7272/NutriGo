const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  label: { type: String, required: true },         
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true }
}, { _id: false });

const FavoriteFoodsSchema = new mongoose.Schema({
  desserts: [{ type: String }],      
  fastFood: [{ type: String }],      
  mainCourse: [{ type: String }]     
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  passwordHash: {
    type: String,
    
  },

  phone: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    default: null
  },

  role: {
    type: String,
    enum: ['customer', 'restaurantOwner', 'admin', 'deliveryPartner'],
    default: 'customer'
  },

  addresses: {
    type: [AddressSchema],
    default: []
  },

  favorites: {
    type: FavoriteFoodsSchema,
    default: {}
  },

  lastLogin: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
