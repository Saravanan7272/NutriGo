# NutriGo - Restaurant Food Ordering System 
[Checkout the Site here !](https://nutri-go-ashy.vercel.app/)

A robust full-stack MERN (MongoDB, Express.js, React, Node.js) application that revolutionizes the restaurant food ordering experience. This comprehensive system serves three distinct user types: customers, restaurant administrators, and system administrators, providing a seamless platform for food ordering, restaurant management, and system administration.

## 🌟 Key Features

### 🍽️ For Customers
- **Restaurant Discovery**: Browse and search through a diverse selection of restaurants
- **Interactive Menu**: View detailed menus with high-quality food images and descriptions
- **Smart Cart Management**: Easily add, remove, and modify items in your cart
- **Location Services**: Find nearby restaurants with integrated map functionality
- **Personalization**: 
  - Save favorite restaurants for quick access
  - View detailed order history
  - Write and read restaurant reviews
  - Manage profile settings
- **Secure Payments**: Integrated Razorpay payment gateway for safe transactions
- **Real-time Updates**: Track order status from placement to delivery

### 👨‍🍳 For Restaurant Owners
- **Comprehensive Dashboard**: Monitor and manage restaurant operations
- **Menu Management**: 
  - Add, edit, and remove menu items
  - Update prices and availability
  - Manage food categories
- **Order Processing**: 
  - Real-time order notifications
  - Update order status
  - View order history
- **Business Insights**: Access analytics and performance metrics
- **Profile Management**: Update restaurant information, hours, and contact details

### 👑 For System Administrators
- **User Management**: Monitor and manage all user accounts
- **Restaurant Oversight**: Review and manage restaurant registrations
- **System Monitoring**: Track overall platform performance
- **Analytics Dashboard**: Access system-wide statistics and reports

## 🛠️ Technical Stack

### Frontend Technologies
- **Core**: React 19.1.0 with Vite 7.0.0
- **Routing**: React Router for seamless navigation
- **State Management**: React Context API
- **UI Components**: Custom components with React Icons
- **Maps Integration**: Leaflet for location services
- **Styling**: CSS with responsive design

### Backend Technologies
- **Server**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Authentication
- **Payment Processing**: Razorpay Integration
- **API Security**: CORS enabled

### Development & Deployment
- **Version Control**: Git
- **Package Management**: npm
- **Build Tool**: Vite
- **API Testing**: Postman

## 📦 Project Structure

```
project/
├── app.js                  # Express server configuration
├── package.json           # Project dependencies and scripts
├── client/               # Frontend React application
│   ├── src/
│   │   ├── ADMIN/        # Admin dashboard components
│   │   ├── FoodItems/    # Food item management
│   │   ├── Home_page/    # Homepage components
│   │   ├── Login/        # Authentication components
│   │   ├── Orders/       # Order management
│   │   ├── Restaurant/   # Restaurant management
│   │   ├── ReviewPage/   # Review components
│   │   ├── User/         # User management
│   │   └── utils/        # Utility functions
├── models/               # MongoDB schemas
│   ├── FoodItem.js      # Food item model
│   ├── Order.js         # Order model
│   ├── Restaurant.js    # Restaurant model
│   ├── Review.js        # Review model
│   └── User.js          # User model
└── routes/              # API routes
    ├── FoodItemController.js
    ├── orderRoutes.js
    ├── paymentRoutes.js
    ├── RestaurantController.js
    ├── reviewRoutes.js
    └── UserController.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- MongoDB Atlas account
- npm or yarn
- Firebase account
- Razorpay account

### Installation Steps

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
cd project
\`\`\`

2. Install backend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd client
npm install
\`\`\`

4. Environment Setup:

Create \`.env\` in the root directory:
\`\`\`
DB_URL=your_mongodb_connection_string
PORT=8000
\`\`\`

Create \`.env\` in the client directory:
\`\`\`
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
RAZORPAY_KEY_ID=your-razorpay-key-id
\`\`\`

### Running the Application

1. Start the backend server:
\`\`\`bash
npm start
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd client
npm run dev
\`\`\`

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## 🔒 Security Features

- **Authentication**: Secure user authentication via Firebase
- **Authorization**: Role-based access control for different user types
- **Data Protection**: 
  - Input validation and sanitization
  - CORS protection
  - Protected API routes
- **Payment Security**: PCI-compliant payment processing through Razorpay
- **Data Privacy**: Secure handling of user and business data

## 📡 API Endpoints

### Restaurants
- `GET /api/restaurants` - List all restaurants
- `POST /api/restaurants` - Create restaurant
- `GET /api/restaurants/:id` - Get restaurant details
- `PUT /api/restaurants/:id` - Update restaurant

### Food Items
- `GET /api/foodItems` - List all items
- `POST /api/foodItems` - Add new item
- `GET /api/foodItems/:id` - Get item details
- `PUT /api/foodItems/:id` - Update item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Users
- `POST /api/users` - Register user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/:restaurantId` - Get restaurant reviews

## 🔄 Upcoming Features

1. **Enhanced Order Experience**
   - Real-time order tracking
   - Delivery time estimation
   - In-app chat support

2. **Business Intelligence**
   - Advanced analytics dashboard
   - Sales forecasting
   - Customer behavior analysis

3. **Platform Expansion**
   - Mobile application development
   - Multi-language support
   - Dark mode support

4. **Technical Improvements**
   - Enhanced search functionality
   - Performance optimization
   - Automated testing implementation
