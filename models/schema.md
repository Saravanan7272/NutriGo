"This document describes the MongoDB collections and their relationships."
## MongoDB: **Collection Design with Schema**

## 📁 Collections Overview
- [1. `users`](#1-users)
- [2. `restaurants`](#2-restaurants)
- [3. `menuItems`](#3-menuitems)
- [4. `orders`](#4-orders)
- [5. `payments`](#5-payments)
- [6. `reviews`](#6-reviews)
- [📦 Sample Flow](#sample-flow)

### 1. `users`

```jsx
{
  _id,
  name,
  email,
  passwordHash,
  phone,
  profileImage: { type: String, optional: true },
  role: 'customer' | 'restaurant' | 'admin' | 'delivery',
  addresses: [{ label, street, city, pincode }],
  favorites: [restaurantId],
  lastLogin: { type: Date, optional: true },
  createdAt
}
```

```jsx
// Customer
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  name: "John Doe",
  email: "john@example.com",
  passwordHash: "$2a$10$xyz...",
  phone: "+1234567890",
  role: "customer",
  addresses: [
    { label: "Home", street: "123 Main St", city: "New York", pincode: "10001" }
  ],
  favorites: [ObjectId("61a0f3b5e8d8a4b5c6f7d2e2")],
  createdAt: ISODate("2023-11-25T10:00:00Z")
}

// Restaurant Owner
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d1e2"),
  name: "Pizza Palace",
  email: "owner@pizzapalace.com",
  passwordHash: "$2a$10$abc...",
  phone: "+1987654321",
  role: "restaurant",
  addresses: [],
  createdAt: ISODate("2023-11-20T09:00:00Z")
}

// Delivery Partner
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d1e3"),
  name: "Mike Johnson",
  email: "mike@delivery.com",
  passwordHash: "$2a$10$def...",
  phone: "+1122334455",
  role: "delivery",
  addresses: [],
  createdAt: ISODate("2023-11-22T08:00:00Z")
}

// Admin
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d1e4"),
  name: "Admin User",
  email: "admin@foodapp.com",
  passwordHash: "$2a$10$ghi...",
  phone: "+1555666777",
  role: "admin",
  addresses: [],
  createdAt: ISODate("2023-11-15T07:00:00Z")
}

// Another Customer
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d1e5"),
  name: "Alice Smith",
  email: "alice@example.com",
  passwordHash: "$2a$10$jkl...",
  phone: "+1444333222",
  role: "customer",
  addresses: [
    { label: "Work", street: "456 Office Ave", city: "New York", pincode: "10002" }
  ],
  favorites: [],
  createdAt: ISODate("2023-11-24T11:00:00Z")
}
```

### 2. `restaurants`

```jsx
{
  _id,
  ownerId,
  name,
  description,
  cuisine: ['Italian', 'Indian'],
  rating,
  address,
  location: { lat, lng },
  images: [imageUrl],
  openHours,
  minOrderAmount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  isActive,
  createdAt
}
```

```jsx
// Italian Restaurant
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  ownerId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e2"),
  name: "Pizza Palace",
  description: "Authentic Italian pizzas and pastas",
  cuisine: ["Italian"],
  rating: 4.5,
  address: "789 Food St, New York, NY 10003",
  location: { lat: 40.7128, lng: -74.0060 },
  images: ["https://example.com/pizza.jpg"],
  openHours: "10:00 AM - 10:00 PM",
  minOrderAmount: 10,
  deliveryFee: 2.5,
  isActive: true,
  createdAt: ISODate("2023-11-20T09:00:00Z")
}

// Indian Restaurant
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d2e3"),
  ownerId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e6"),
  name: "Spice Garden",
  description: "Traditional Indian curries and biryanis",
  cuisine: ["Indian"],
  rating: 4.2,
  address: "101 Curry Lane, New York, NY 10004",
  location: { lat: 40.7130, lng: -74.0050 },
  images: ["https://example.com/curry.jpg"],
  openHours: "11:00 AM - 11:00 PM",
  minOrderAmount: 15,
  deliveryFee: 3.0,
  isActive: true,
  createdAt: ISODate("2023-11-21T10:00:00Z")
}

// Burger Joint
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d2e4"),
  ownerId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e7"),
  name: "Burger King",
  description: "American-style burgers and fries",
  cuisine: ["American"],
  rating: 4.0,
  address: "202 Burger Ave, New York, NY 10005",
  location: { lat: 40.7140, lng: -74.0040 },
  images: ["https://example.com/burger.jpg"],
  openHours: "9:00 AM - 12:00 AM",
  minOrderAmount: 8,
  deliveryFee: 2.0,
  isActive: true,
  createdAt: ISODate("2023-11-22T11:00:00Z")
}

// Sushi Place
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d2e5"),
  ownerId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e8"),
  name: "Sushi World",
  description: "Fresh Japanese sushi and sashimi",
  cuisine: ["Japanese"],
  rating: 4.7,
  address: "303 Fish St, New York, NY 10006",
  location: { lat: 40.7150, lng: -74.0030 },
  images: ["https://example.com/sushi.jpg"],
  openHours: "12:00 PM - 10:00 PM",
  minOrderAmount: 20,
  deliveryFee: 4.0,
  isActive: true,
  createdAt: ISODate("2023-11-23T12:00:00Z")
}

// Mexican Restaurant
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d2e6"),
  ownerId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e9"),
  name: "Taco Fiesta",
  description: "Spicy Mexican tacos and burritos",
  cuisine: ["Mexican"],
  rating: 4.3,
  address: "404 Pepper Rd, New York, NY 10007",
  location: { lat: 40.7160, lng: -74.0020 },
  images: ["https://example.com/taco.jpg"],
  openHours: "11:00 AM - 11:00 PM",
  minOrderAmount: 12,
  deliveryFee: 2.5,
  isActive: true,
  createdAt: ISODate("2023-11-24T13:00:00Z")
}
```

### 3. `menuItems`

```jsx
{
  _id,
  restaurantId,
  name,
  category: String, // 'starter', 'main', 'dessert', etc.
  description,
  price,
  imageUrl,
  isAvailable,
  isVegetarian: { type: Boolean, default: false },
  customizations: [{ name: String, options: [String] }],
}
```

```jsx
// Pizza Item
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d3e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  name: "Margherita Pizza",
  category: "main",
  description: "Classic pizza with tomato sauce and mozzarella",
  price: 12.99,
  imageUrl: "https://example.com/margherita.jpg",
  isAvailable: true,
  isVegetarian: true,
  customizations: [
    { name: "Size", options: ["Small", "Medium", "Large"] },
    { name: "Extra Cheese", options: ["Yes", "No"] }
  ]
}

// Pasta Item
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d3e2"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  name: "Spaghetti Carbonara",
  category: "main",
  description: "Pasta with creamy egg and bacon sauce",
  price: 14.99,
  imageUrl: "https://example.com/carbonara.jpg",
  isAvailable: true,
  isVegetarian: false,
  customizations: [
    { name: "Spiciness", options: ["Mild", "Medium", "Hot"] }
  ]
}

// Burger Item
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d3e3"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e4"),
  name: "Classic Cheeseburger",
  category: "main",
  description: "Beef patty with cheese, lettuce, and tomato",
  price: 8.99,
  imageUrl: "https://example.com/cheeseburger.jpg",
  isAvailable: true,
  isVegetarian: false,
  customizations: [
    { name: "Doneness", options: ["Medium", "Well Done"] },
    { name: "Extras", options: ["Bacon", "Avocado"] }
  ]
}

// Sushi Item
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d3e4"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e5"),
  name: "California Roll",
  category: "main",
  description: "Crab, avocado, and cucumber roll",
  price: 9.99,
  imageUrl: "https://example.com/california-roll.jpg",
  isAvailable: true,
  isVegetarian: false,
  customizations: [
    { name: "Wasabi", options: ["Yes", "No"] }
  ]
}

// Dessert Item
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d3e5"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  name: "Tiramisu",
  category: "dessert",
  description: "Italian coffee-flavored dessert",
  price: 6.99,
  imageUrl: "https://example.com/tiramisu.jpg",
  isAvailable: true,
  isVegetarian: true,
  customizations: []
}
```

### 4. `orders`

```jsx
{
  _id,
  userId,
  restaurantId,
  items: [
    {
      menuItemId,
      name: String, // Cache item name in case menu changes
      quantity,
      selectedOptions: [{ name: String, option: String }],
      itemPrice
    }
  ],
  subtotal,
  deliveryFee,
  tax,
  totalAmount,
  status: 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled',
  deliveryInfo: {
    address,
    notes,
    timeSlot
  },
  paymentStatus: 'paid' | 'pending' | 'failed',
  placedAt,
  updatedAt // Track last status change
}
```

```jsx
// Order 1 (Preparing)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d4e1"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  items: [
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e1"),
      name: "Margherita Pizza",
      quantity: 1,
      selectedOptions: [
        { name: "Size", option: "Medium" },
        { name: "Extra Cheese", option: "Yes" }
      ],
      itemPrice: 12.99
    },
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e5"),
      name: "Tiramisu",
      quantity: 1,
      selectedOptions: [],
      itemPrice: 6.99
    }
  ],
  subtotal: 19.98,
  deliveryFee: 2.5,
  tax: 1.80,
  totalAmount: 24.28,
  status: "preparing",
  deliveryInfo: {
    address: { label: "Home", street: "123 Main St", city: "New York", pincode: "10001" },
    notes: "Ring the bell twice",
    timeSlot: "7:00 PM - 8:00 PM"
  },
  paymentStatus: "paid",
  placedAt: ISODate("2023-11-25T18:30:00Z"),
  updatedAt: ISODate("2023-11-25T18:35:00Z")
}

// Order 2 (Out for Delivery)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d4e2"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e5"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e4"),
  items: [
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e3"),
      name: "Classic Cheeseburger",
      quantity: 2,
      selectedOptions: [
        { name: "Doneness", option: "Medium" }
      ],
      itemPrice: 8.99
    }
  ],
  subtotal: 17.98,
  deliveryFee: 2.0,
  tax: 1.60,
  totalAmount: 21.58,
  status: "out_for_delivery",
  deliveryInfo: {
    address: { label: "Work", street: "456 Office Ave", city: "New York", pincode: "10002" },
    notes: "Leave at reception",
    timeSlot: "12:30 PM - 1:30 PM"
  },
  paymentStatus: "paid",
  placedAt: ISODate("2023-11-25T12:00:00Z"),
  updatedAt: ISODate("2023-11-25T12:45:00Z")
}

// Order 3 (Delivered)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d4e3"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e5"),
  items: [
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e4"),
      name: "California Roll",
      quantity: 3,
      selectedOptions: [
        { name: "Wasabi", option: "Yes" }
      ],
      itemPrice: 9.99
    }
  ],
  subtotal: 29.97,
  deliveryFee: 4.0,
  tax: 2.70,
  totalAmount: 36.67,
  status: "delivered",
  deliveryInfo: {
    address: { label: "Home", street: "123 Main St", city: "New York", pincode: "10001" },
    notes: "",
    timeSlot: "7:00 PM - 8:00 PM"
  },
  paymentStatus: "paid",
  placedAt: ISODate("2023-11-24T19:00:00Z"),
  updatedAt: ISODate("2023-11-24T20:15:00Z")
}

// Order 4 (Cancelled)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d4e4"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e5"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e3"),
  items: [
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e6"),
      name: "Chicken Biryani",
      quantity: 1,
      selectedOptions: [],
      itemPrice: 14.99
    }
  ],
  subtotal: 14.99,
  deliveryFee: 3.0,
  tax: 1.35,
  totalAmount: 19.34,
  status: "cancelled",
  deliveryInfo: {
    address: { label: "Work", street: "456 Office Ave", city: "New York", pincode: "10002" },
    notes: "",
    timeSlot: "1:00 PM - 2:00 PM"
  },
  paymentStatus: "pending",
  placedAt: ISODate("2023-11-23T12:30:00Z"),
  updatedAt: ISODate("2023-11-23T12:45:00Z")
}

// Order 5 (Paid but Failed Delivery)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d4e5"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e6"),
  items: [
    {
      menuItemId: ObjectId("61a0f3b5e8d8a4b5c6f7d3e7"),
      name: "Beef Burrito",
      quantity: 2,
      selectedOptions: [
        { name: "Spiciness", option: "Medium" }
      ],
      itemPrice: 10.99
    }
  ],
  subtotal: 21.98,
  deliveryFee: 2.5,
  tax: 1.98,
  totalAmount: 26.46,
  status: "cancelled",
  deliveryInfo: {
    address: { label: "Home", street: "123 Main St", city: "New York", pincode: "10001" },
    notes: "",
    timeSlot: "6:00 PM - 7:00 PM"
  },
  paymentStatus: "failed",
  placedAt: ISODate("2023-11-22T17:30:00Z"),
  updatedAt: ISODate("2023-11-22T18:00:00Z")
}
```

### 5. `payments`

```jsx
{
  _id,
  orderId,
  method: 'card' | 'upi' | 'cod',
  transactionId,
  status: 'success' | 'failed' | 'pending',
  amount,
  paymentDate: { type: Date, default: Date.now }
}
```

```jsx
// Successful Card Payment
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d5e1"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e1"),
  method: "card",
  transactionId: "txn_123456789",
  status: "success",
  amount: 24.28,
  paymentDate: ISODate("2023-11-25T18:31:00Z")
}

// COD Payment (Pending until delivery)
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d5e2"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e2"),
  method: "cod",
  transactionId: null,
  status: "pending",
  amount: 21.58,
  paymentDate: null
}

// Failed UPI Payment
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d5e3"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e5"),
  method: "upi",
  transactionId: "txn_987654321",
  status: "failed",
  amount: 26.46,
  paymentDate: ISODate("2023-11-22T17:35:00Z")
}

// Successful Card Payment
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d5e4"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e3"),
  method: "card",
  transactionId: "txn_112233445",
  status: "success",
  amount: 36.67,
  paymentDate: ISODate("2023-11-24T19:02:00Z")
}

// Refunded Payment
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d5e5"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e4"),
  method: "card",
  transactionId: "txn_556677889",
  status: "failed",
  amount: 19.34,
  paymentDate: ISODate("2023-11-23T12:32:00Z")
}
```

### 6. `reviews`

```jsx
{
  _id,
  userId,
  restaurantId,
  orderId, // To ensure only customers who ordered can review
  rating,
  comment,
  createdAt
}
```

```jsx
// Review for Pizza Place
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d6e1"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e2"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e1"),
  rating: 5,
  comment: "Best pizza in town! Delivery was fast too.",
  createdAt: ISODate("2023-11-25T21:00:00Z")
}

// Review for Burger King
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d6e2"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e5"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e4"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e2"),
  rating: 4,
  comment: "Good burgers, but fries were cold.",
  createdAt: ISODate("2023-11-25T14:00:00Z")
}

// Review for Sushi World
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d6e3"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e5"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e3"),
  rating: 5,
  comment: "Fresh and delicious sushi!",
  createdAt: ISODate("2023-11-24T21:30:00Z")
}

// Negative Review for Spice Garden
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d6e4"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e5"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e3"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e4"),
  rating: 2,
  comment: "Order was cancelled after 30 mins. Very disappointed.",
  createdAt: ISODate("2023-11-23T13:30:00Z")
}

// Review for Taco Fiesta
{
  _id: ObjectId("61a0f3b5e8d8a4b5c6f7d6e5"),
  userId: ObjectId("61a0f3b5e8d8a4b5c6f7d1e1"),
  restaurantId: ObjectId("61a0f3b5e8d8a4b5c6f7d2e6"),
  orderId: ObjectId("61a0f3b5e8d8a4b5c6f7d4e5"),
  rating: 1,
  comment: "Payment failed and order was cancelled. Poor experience.",
  createdAt: ISODate("2023-11-22T18:30:00Z")
}
```

### **Sample Flow:**

1. **John Doe** (customer) places an order at **Pizza Palace** (Order #1).
2. Payment is processed successfully via card.
3. Restaurant accepts the order (status: "preparing").
4. After preparation, delivery partner picks it up (status: "out_for_delivery").
5. Order is delivered (status: "delivered").
6. John leaves a 5-star review.
![pick](https://github.com/user-attachments/assets/3e6d71eb-948f-49ac-85b0-a175f95879b2)
