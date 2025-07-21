import React, { useEffect, useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import './ViewRestaurants.css';

function ViewAllRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10;


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/restaurants');
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);


  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(restaurant.cuisine) ?
        restaurant.cuisine.join(', ').toLowerCase().includes(searchTerm.toLowerCase()) :
        restaurant.cuisine?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      restaurant.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.owner?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.owner?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [restaurants, searchTerm]);


  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);


  const csvData = useMemo(() => {
    return filteredRestaurants.map(restaurant => ({
      Name: restaurant.name,
      Description: restaurant.description || 'N/A',
      Cuisine: Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : restaurant.cuisine || 'N/A',
      Address: restaurant.address || 'N/A',
      Location: restaurant.location ? `https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}` : 'N/A',
      'Open Hours': restaurant.openHours || 'N/A',
      'Min Order': `₹${restaurant.minOrderAmount || 0}`,
      'Delivery Fee': `₹${restaurant.deliveryFee || 0}`,
      Rating: restaurant.rating || 'N/A',
      Active: restaurant.isActive ? 'Yes' : 'No',
      Owner: restaurant.owner?.username || 'N/A',
      'Owner Email': restaurant.owner?.email || 'N/A',
      'Created At': new Date(restaurant.createdAt).toLocaleString()
    }));
  }, [filteredRestaurants]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="vr-container">
        <div className="vr-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vr-container">
        <div className="vr-error-message">
          <p>⚠️ Error loading restaurants: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vr-container">
      <div className="vr-header">
        <h2>🍽️ Restaurant Management</h2>
        <div className="vr-count">{filteredRestaurants.length} restaurants found</div>
      </div>

      <div className="vr-controls-container">
        <div className="vr-search-container">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="vr-search-input"
          />
          <span className="vr-search-icon">🔍</span>
        </div>

        <CSVLink
          data={csvData}
          filename={"restaurants-export.csv"}
          className="vr-export-btn"
        >
          Export to CSV
        </CSVLink>
      </div>

      <div className="vr-table-container">
        <table className="vr-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Details</th>
              <th>Location</th>
              <th>Pricing</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRestaurants.length > 0 ? (
              currentRestaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td className="vr-profile">
                    <div className="vr-avatar-container">
                      {restaurant.images?.length > 0 ? (
                        <img
                          src={restaurant.images[0]}
                          alt={restaurant.name}
                          className="vr-avatar"
                        />
                      ) : (
                        <div className="vr-no-image">🍽️</div>
                      )}
                    </div>
                    <div className="vr-info">
                      <div className="vr-name">{restaurant.name}</div>
                      <div className="vr-id">ID: {restaurant._id}</div>
                      <div className="vr-cuisine">
                        {Array.isArray(restaurant.cuisine) ?
                          restaurant.cuisine.join(', ') :
                          restaurant.cuisine}
                      </div>
                    </div>
                  </td>
                  <td className="vr-details">
                    <div className="vr-description">
                      {restaurant.description || 'No description'}
                    </div>
                    <div className="vr-hours">
                      {restaurant.openHours || 'Hours not specified'}
                    </div>
                    <div className="vr-rating">
                      Rating: {restaurant.rating || 'N/A'}
                    </div>
                  </td>
                  <td className="vr-location">
                    <div className="vr-address">
                      {restaurant.address || 'No address'}
                    </div>
                    {restaurant.location && (
                      <a
                        href={`https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vr-map-link"
                      >
                        View on Map
                      </a>
                    )}
                  </td>
                  <td className="vr-pricing">
                    <div className="vr-pricing-item">
                      <span className="vr-pricing-label">Min Order:</span>
                      <span className="vr-pricing-value">₹{restaurant.minOrderAmount || 0}</span>
                    </div>
                    <div className="vr-pricing-item">
                      <span className="vr-pricing-label">Delivery Fee:</span>
                      <span className="vr-pricing-value">₹{restaurant.deliveryFee || 0}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`vr-status-badge ${restaurant.isActive ? 'vr-active' : 'vr-inactive'}`}>
                      {restaurant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="vr-owner">
                    <div className="vr-owner-name">
                      {restaurant.owner?.username || 'N/A'}
                    </div>
                    <div className="vr-owner-email">
                      {restaurant.owner?.email || 'N/A'}
                    </div>
                  </td>
                  <td className="vr-join-date">
                    {new Date(restaurant.createdAt).toLocaleDateString()}
                    <div className="vr-join-time">
                      {new Date(restaurant.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="vr-actions">
                    <button className="vr-action-btn vr-view-btn">View</button>
                    <button className="vr-action-btn vr-edit-btn">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="vr-no-results">
                  No restaurants found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredRestaurants.length > restaurantsPerPage && (
        <div className="vr-pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="vr-pagination-btn"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`vr-pagination-btn ${currentPage === number ? 'vr-active' : ''}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="vr-pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewAllRestaurant;