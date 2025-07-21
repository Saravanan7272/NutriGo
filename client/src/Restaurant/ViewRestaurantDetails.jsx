import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaClock, FaUtensils, FaLeaf, FaFire } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import '../assets/style/Homepage.css';
import './ViewRestaurantDetails.css';

function ViewRestaurantDetails({
  cart,
  setCart,
  handleIncrement,
  handleDecrement
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);


  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customizations, setCustomizations] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [resRes, foodRes] = await Promise.all([
          fetch(`http://localhost:8000/api/restaurants/${id}`),
          fetch(`http://localhost:8000/api/food-items-by-restaurant?restaurantId=${id}`)
        ]);

        if (!resRes.ok) throw new Error('Failed to fetch restaurant');
        if (!foodRes.ok) throw new Error('Failed to fetch menu items');

        const resData = await resRes.json();
        const foodData = await foodRes.json();

        setRestaurant(resData);
        setFoodItems(foodData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // const handleIncrement = (itemId) => {
  //   setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  // };

  // const handleDecrement = (itemId) => {
  //   if (cart[itemId] > 1) {
  //     setCart(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   } else {
  //     const updated = { ...cart };
  //     delete updated[itemId];
  //     setCart(updated);
  //   }
  // };

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCustomizationChange = (itemId, customizationName, option) => {
    setCustomizations(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [customizationName]: option
      }
    }));
  };

  const toggleItemExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const categories = ['All', ...new Set(foodItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'All'
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  const addToCartAndNavigate = () => {
    navigate('/cart');
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading restaurant details...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p className="error-message">❌ {error}</p>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );

  if (!restaurant) return (
    <div className="not-found-container">
      <p>Restaurant not found</p>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );

  return (
    <div className="restaurant-detail-container">
      {/* Restaurant Header Section */}
      <div className="restaurant-header">
        {restaurant.images?.[0] && (
          <div className="restaurant-banner" style={{ backgroundImage: `url(${restaurant.images[0]})` }} />
        )}

        <div className="restaurant-info-overlay">
          <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back
          </button>

          <div className="restaurant-meta">
            <h1 className="restaurant-name">{restaurant.name}</h1>

            <div className="restaurant-tags">
              <span className="rating-tag">
                <FaStar className="icon" /> {restaurant.rating}
              </span>
              {restaurant.cuisine?.map((cuisine, index) => (
                <span key={index} className="cuisine-tag">{cuisine}</span>
              ))}
              {restaurant.isVegetarian && (
                <span className="veg-tag">
                  <FaLeaf className="icon" /> Veg
                </span>
              )}
            </div>

            <div className="restaurant-details">
              <p className="detail-item">
                <IoLocationSharp className="icon" />
                {restaurant.address}
              </p>
              <p className="detail-item">
                <FaClock className="icon" />
                {restaurant.openHours}
              </p>
            </div>
            <button
              className="about-button"
              onClick={() => navigate(`/about-restaurant`)}
            >
              Learn More About Us
            </button>

          </div>
        </div>
      </div>

      {/* Restaurant Description */}
      <div className="restaurant-description">
        <h2>About {restaurant.name}</h2>
        <p>{restaurant.description}</p>
      </div>

      {/* Menu Section */}
      <div className="menu-section">
        <div className="menu-header">
          <h2>Menu</h2>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-menu">
            <p>No items available in this category</p>
          </div>
        ) : (
          <div className="food-items-grid">
            {filteredItems.map(item => (
              <div key={item._id} className={`food-item-card ${!item.isAvailable ? 'unavailable' : ''}`}>
                {!item.isAvailable && (
                  <div className="unavailable-badge">Sold Out</div>
                )}

                <button
                  className={`favorite-button ${favorites.includes(item._id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(item._id)}
                >
                  {favorites.includes(item._id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                <div
                  className="food-item-image"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                  onClick={() => toggleItemExpand(item._id)}
                />

                <div className="food-item-info">
                  <div className="food-item-header">
                    <h3 onClick={() => toggleItemExpand(item._id)}>{item.name}</h3>
                    <div className="food-item-price">₹{item.price.toFixed(2)}</div>
                  </div>

                  <div className="food-item-meta">
                    {item.isVegetarian && (
                      <span className="veg-indicator">
                        <FaLeaf /> Vegetarian
                      </span>
                    )}
                    <span className="food-category">
                      <FaUtensils /> {item.category}
                    </span>
                  </div>

                  {expandedItem === item._id && (
                    <div className="food-item-details">
                      <p className="food-description">{item.description}</p>

                      {item.customizations?.length > 0 && (
                        <div className="customization-options">
                          <h4>Customizations:</h4>
                          {item.customizations.map((customization, idx) => (
                            <div key={idx} className="customization-group">
                              <label>{customization.name}:</label>
                              <div className="customization-buttons">
                                {customization.options.map(option => (
                                  <button
                                    key={option}
                                    className={`customization-option ${customizations[item._id]?.[customization.name] === option ? 'selected' : ''
                                      }`}
                                    onClick={() => handleCustomizationChange(item._id, customization.name, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="food-item-actions">
                    {cart[item._id] ? (
                      <div className="quantity-controls">
                        <button onClick={() => handleDecrement(item._id)}>-</button>
                        <span>{cart[item._id]}</span>
                        <button onClick={() => handleIncrement(item._id)}>+</button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart-button"
                        onClick={() => handleIncrement(item._id)}
                        disabled={!item.isAvailable}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {Object.keys(cart).length > 0 && (
        <div className="floating-cart" onClick={addToCartAndNavigate}>
          <div className="cart-count">{Object.values(cart).reduce((a, b) => a + b, 0)}</div>
          <button className="view-cart-button">View Cart & Checkout</button>
          <div className="cart-total">
            ₹{Object.entries(cart).reduce((total, [itemId, quantity]) => {
              const item = foodItems.find(i => i._id === itemId);
              return total + (item ? item.price * quantity : 0);
            }, 0).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRestaurantDetails;