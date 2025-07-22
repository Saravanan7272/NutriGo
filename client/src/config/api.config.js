// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
    // User endpoints
    USERS: `${API_BASE_URL}/users`,
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users/register`,


    USER_ADD: `${API_BASE_URL}/add-user`,
    
    // Restaurant endpoints
    RESTAURANTS: `${API_BASE_URL}/restaurants`,
    RESTAURANT_ADD: `${API_BASE_URL}/add-restaurant`,
    // Food items endpoints
    FOOD_ITEMS: `${API_BASE_URL}/food-items`,

    ADD_FOOD_ITEM: `${API_BASE_URL}/add-food-item`,
    
    // Order endpoints
    ORDERS: `${API_BASE_URL}/orders`,

    ORDER : `${API_BASE_URL}/order`,
    
    // Payment endpoints
    PAYMENTS: `${API_BASE_URL}/payments`,
    
    // Review endpoints
    REVIEWS: `${API_BASE_URL}/reviews`
};
