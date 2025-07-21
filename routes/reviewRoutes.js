const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review', details: err.message });
  }
});

router.get('/reviews/:restaurantId', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
