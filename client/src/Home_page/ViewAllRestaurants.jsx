import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import { FiSearch, FiX, FiFilter, FiStar } from 'react-icons/fi';
import '../assets/style/Homepage.css';
import '../assets/style/ViewAllRestaurants.css';

const AllRestaurants = ({ restaurants, favorites, toggleFavorite }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: null,
    deliveryTime: null,
    priceRange: null
  });

  useEffect(() => {
    let filtered = [...restaurants];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(restaurant => {
        const nameMatch = restaurant.name.toLowerCase().includes(searchLower);
        const cuisineMatch = Array.isArray(restaurant.cuisine)
          ? restaurant.cuisine.some(c => c.toLowerCase().includes(searchLower))
          : String(restaurant.cuisine || '').toLowerCase().includes(searchLower);
        const addressMatch = restaurant.address.toLowerCase().includes(searchLower);
        return nameMatch || cuisineMatch || addressMatch;
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(r => r.rating >= filters.rating);
    }
    if (filters.deliveryTime) {
      filtered = filtered.filter(r => r.deliveryTime <= filters.deliveryTime);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(r => {
        if (filters.priceRange === '$') return r.priceLevel <= 1;
        if (filters.priceRange === '$$') return r.priceLevel <= 3;
        return true;
      });
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants, filters]);

  const highlightMatch = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType] ? null : value
    }));
  };

  return (
    <div className="food-delivery-app all-restaurants-section">
      <section className="all-restaurants-section">
        <div className="section-header">
          <h1>All Restaurants</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="search-container-wrapper">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search restaurants by name, cuisine, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                <FiX />
              </button>
            )}
            <button className="search-button" onClick={() => { }}>
              Search
            </button>
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <h4>Rating</h4>
                <div className="rating-filters">
                  {[4, 3, 2].map(rating => (
                    <button
                      key={rating}
                      className={`rating-filter ${filters.rating === rating ? 'active' : ''}`}
                      onClick={() => handleFilterChange('rating', rating)}
                    >
                      {rating}+ <FiStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Delivery Time</h4>
                <div className="delivery-filters">
                  {['30 min', '45 min', '60 min'].map((time, i) => (
                    <button
                      key={time}
                      className={`delivery-filter ${filters.deliveryTime === (i + 1) * 15 ? 'active' : ''}`}
                      onClick={() => handleFilterChange('deliveryTime', (i + 1) * 15)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-filters">
                  {['$', '$$', '$$$'].map(range => (
                    <button
                      key={range}
                      className={`price-filter ${filters.priceRange === range ? 'active' : ''}`}
                      onClick={() => handleFilterChange('priceRange', range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {searchTerm || Object.values(filters).some(Boolean) ? (
          <div className="results-count">
            Showing {filteredRestaurants.length} of {restaurants.length} restaurants
          </div>
        ) : null}

        <div className="restaurants-grid">
          {filteredRestaurants.length === 0 ? (
            <div className="no-results-container">
              <p className="no-data-message">
                {searchTerm
                  ? `No restaurants match "${searchTerm}"...`
                  : 'No restaurants match your filters...'
                }
              </p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    rating: null,
                    deliveryTime: null,
                    priceRange: null
                  });
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={{
                  ...restaurant,
                  name: highlightMatch(restaurant.name),
                  cuisine: Array.isArray(restaurant.cuisine)
                    ? restaurant.cuisine.map(c => highlightMatch(c))
                    : highlightMatch(String(restaurant.cuisine || ''))
                }}
                isFavorite={favorites.includes(restaurant._id)}
                toggleFavorite={toggleFavorite}
                onQuickView={() => navigate(`/view-restaurant/${restaurant._id}`)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AllRestaurants;