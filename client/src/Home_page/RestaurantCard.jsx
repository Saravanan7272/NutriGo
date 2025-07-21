import React, { useState } from 'react';

const RestaurantCard = ({ restaurant, isFavorite, toggleFavorite, onQuickView, highlightedName, highlightedAddress }) => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div
      className={`restaurant-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onQuickView}
      role="button"
      tabIndex={0}
      aria-label={`View ${restaurant.name} details`}
    >
      {restaurant.rating >= 4.5 && (
        <div className="card-badge">⭐ Top Rated</div>
      )}

      <button
        className={`like-btn ${isFavorite ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(restaurant._id);
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div
        className="card-image"
        style={{
          backgroundImage: `url(${restaurant.images?.[0] || 'https://via.placeholder.com/300x200'})`
        }}
      >
        <div className="overlay">
          <button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3>{highlightedName || restaurant.name}</h3>


        <div className="cuisine-tags">
          {restaurant.cuisine?.map((cuisine, i) => (
            <span key={i} className="tag">{cuisine}</span>
          ))}
        </div>
        <p className="restaurant-address">
          <strong>📍 Address:</strong> {highlightedAddress || restaurant.address}
        </p>

        <p>
          <strong>⏰ Open Hours:</strong> {restaurant.openHours || 'Not specified'}
        </p>
        <div className="rating">
          <strong>★ {restaurant.rating?.toFixed(1) || 'N/A'}</strong>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;