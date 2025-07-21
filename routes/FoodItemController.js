const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');


router.post('/add-food-item', async (req, res) => {
  try {
    
    const foodItem = new FoodItem(req.body);
    await foodItem.save();
    res.status(201).json({ message: 'Food item saved!', foodItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save food item', details: err.message });
  }
});


router.get('/food-items', async (req, res) => {
  try {
    const items = await FoodItem.find().sort({ price: -1 }); // you can sort by rating if added
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch food items' });
  }
});

router.get('/food-items-by-restaurant', async (req, res) => {
  const { restaurantId } = req.query;
  if (!restaurantId) return res.status(400).json({ error: 'Missing restaurantId' });

  try {
    const items = await FoodItem.find({ restaurantId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/food-items/:id', async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id).populate('restaurantId');
    if (!item) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
