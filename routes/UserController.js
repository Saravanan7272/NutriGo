const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send('User added successfully');
  } catch (err) {
    console.error('User creation failed:', err);
    res.status(400).send('Error: ' + err.message);
  }
});

router.get('/users/get-user-type', async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      userRole: user.role, 
      name: user.name,
      userId: user._id
    });
  } catch (err) {
    console.error('Error in get-user-type:', err);
    res.status(500).json({ message: 'Error retrieving user type' }); 
  }
});



router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(' Error: ' + err.message);
  }
});


router.get('/View-all-users', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash'); 
    res.json(users);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});




module.exports = router;
