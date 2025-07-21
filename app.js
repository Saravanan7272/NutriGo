const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./routes/RestaurantController');
const userRoutes = require('./routes/UserController');
const foodItemRoutes = require('./routes/FoodItemController');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
//const DB_URL = 'mongodb+srv://Saravanan:saro@cluster0.ec6qgv8.mongodb.net/restaurantApp?retryWrites=true&w=majority&tls=true';
const DB_URL =process.env.MONGO_URI;
app.use(cors());
app.use(express.json());
mongoose.connect(DB_URL);
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err.message));



// Use routes
app.use('/api', restaurantRoutes);
app.use('/api', foodItemRoutes);
app.use('/api', userRoutes);

app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);


app.use('/api', paymentRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
