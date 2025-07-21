# Restaurant Food Ordering System - NutriGo

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for restaurant food ordering and management. The system allows customers to browse restaurants, order food, and restaurants to manage their menus and orders.

## Features

### Customer Features
- Browse restaurants and their menus
- View detailed restaurant information and location using maps
- Add items to cart and manage orders
- Process payments securely
- Mark restaurants as favorites
- Write and read reviews
- User profile management
- View order history

### Restaurant Admin Features
- Dashboard for restaurant management
- Add and manage menu items
- Process incoming orders
- Restaurant profile management
- View business analytics

### System Admin Features
- Manage users and restaurants
- System-wide administration
- View all orders and transactions

## Technology Stack

### Frontend
- React 19.1.0
- Vite 7.0.0 for build tooling
- React Router for navigation
- Firebase for authentication
- Leaflet for maps integration
- React Icons for UI elements

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Razorpay for payment processing
- CORS for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd project
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Set up environment variables:
Create a `.env` file in the root directory and add:
```
DB_URL=your_mongodb_connection_string
PORT=8000
```

### Running the Application

1. Start the backend server:
```bash
npm start
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `POST /api/restaurants` - Add a new restaurant
- `GET /api/restaurants/:id` - Get restaurant details
- `PUT /api/restaurants/:id` - Update restaurant details

### Food Items
- `GET /api/foodItems` - Get all food items
- `POST /api/foodItems` - Add a new food item
- `GET /api/foodItems/:id` - Get food item details
- `PUT /api/foodItems/:id` - Update food item

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Users
- `POST /api/users` - Register a new user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Reviews
- `POST /api/reviews` - Add a new review
- `GET /api/reviews/:restaurantId` - Get restaurant reviews

## Project Structure
```
project/
├── app.js              # Express application setup
├── client/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
├── models/            # MongoDB models
├── routes/            # API routes
└── package.json
```

## Security Features
- Firebase Authentication
- Secure payment processing
- Protected API routes
- Input validation
- CORS protection

## Future Enhancements
- Real-time order tracking
- Advanced analytics dashboard
- Mobile application
- Multi-language support
- Enhanced search functionality
