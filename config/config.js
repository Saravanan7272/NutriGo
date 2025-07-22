require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI,
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET
};
