
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');



router.post('/add-restaurant', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({ message: ' Restaurant saved!', restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Failed to save restaurant', details: err.message });
  }
});


router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('owner');
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});


router.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner');
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
