import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';
import ItemDetailsModal from '../Home_page/ItemDetailsModal';

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  popularItems,
  restaurants,
  cart,
  setCart
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r._id));
  const favoriteFoodItems = popularItems.filter(i => favorites.includes(i._id));


  const viewItemDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };


  const handleIncrement = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };


  const handleDecrement = (itemId) => {
    if (cart[itemId] > 1) {
      setCart(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
    } else {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    }
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>

      {/* Favorite Restaurants */}
      <section className="favorite-section">
        <h2>Restaurants ({favoriteRestaurants.length})</h2>
        {favoriteRestaurants.length > 0 ? (
          <div className="favorites-grid">
            {favoriteRestaurants.map(restaurant => (
              <div key={restaurant._id} className="favorite-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${restaurant.images?.[0] || 'https://via.placeholder.com/300x200'})`
                  }}
                />
                <div className="card-body">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.cuisine?.join(', ')}</p>
                  <div className="card-actions">
                    <Link to={`/view-restaurant/${restaurant._id}`} className="view-btn">
                      View
                    </Link>
                    <button
                      onClick={() => toggleFavorite(restaurant._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites">You haven't favorited any restaurants yet.</p>
        )}
      </section>

      {/* Favorite Food Items */}
      <section className="favorite-section">
        <h2>Food Items ({favoriteFoodItems.length})</h2>
        {favoriteFoodItems.length > 0 ? (
          <div className="favorites-grid">
            {favoriteFoodItems.map(item => (
              <div key={item._id} className="favorite-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div className="price">₹{item.price.toFixed(2)}</div>
                  <div className="card-actions">
                    <button
                      className="view-btn"
                      onClick={() => viewItemDetails(item)}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleFavorite(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites">You haven't favorited any food items yet.</p>
        )}
      </section>

      {/* Modal */}
      {showModal && selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          cart={cart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          onClose={() => setShowModal(false)}
        />
      )}

      <Link to="/" className="back-to-home">Back to Home</Link>
    </div>
  );
};

export default FavoritesPage;

