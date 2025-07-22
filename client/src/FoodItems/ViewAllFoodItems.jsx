import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import './ViewAllFoodItems.css';
import { API_ENDPOINTS} from '../config/api.config';
function ViewAllFoodItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch food items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FOOD_ITEMS);
        if (!response.ok) throw new Error('Failed to fetch food items');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle delete item
  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        const response = await fetch(`${API_ENDPOINTS.FOOD_ITEMS}/${itemId}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete item');

        setItems(items.filter(item => item._id !== itemId));
      } catch (err) {
        setError(err.message);
      }
    }
  };


  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.restaurantId?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.customizations?.some(cust =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.options.some(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
      ))
    );
  }, [items, searchTerm]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


  const csvData = useMemo(() => {
    return filteredItems.map(item => ({
      Name: item.name,
      Category: item.category,
      Description: item.description || 'N/A',
      Price: `₹${item.price}`,
      'Image URL': item.imageUrl || 'N/A',
      Available: item.isAvailable ? 'Yes' : 'No',
      Vegetarian: item.isVegetarian ? 'Yes' : 'No',
      Customizations: item.customizations?.map(c => `${c.name}: ${c.options.join(', ')}`).join(' | ') || 'None',
      Restaurant: item.restaurantId?.name || item.restaurantId || 'N/A'
    }));
  }, [filteredItems]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="vfi-container">
        <div className="vfi-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vfi-container">
        <div className="vfi-error-message">
          <p>⚠️ Error loading food items: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vfi-container">
      <div className="vfi-header">
        <h2>📋 Food Items Management</h2>
        <div className="vfi-count">{filteredItems.length} items found</div>
      </div>

      <div className="vfi-controls-container">
        <div className="vfi-search-container">
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="vfi-search-input"
          />
          <span className="vfi-search-icon">🔍</span>
        </div>

        <CSVLink
          data={csvData}
          filename={"food-items-export.csv"}
          className="vfi-export-btn"
        >
          Export to CSV
        </CSVLink>
      </div>

      <div className="vfi-table-container">
        <table className="vfi-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Details</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Type</th>
              <th>Customizations</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item._id}>
                  <td className="vfi-profile">
                    <div className="vfi-info">
                      <div className="vfi-name">{item.name}</div>
                      <div className="vfi-category">{item.category}</div>
                      <div className="vfi-id">ID: {item._id}</div>
                    </div>
                  </td>
                  <td className="vfi-details">
                    <div className="vfi-description">
                      {item.description || 'No description'}
                    </div>
                  </td>
                  <td className="vfi-price">
                    ₹{item.price}
                  </td>
                  <td className="vfi-image">
                    {item.imageUrl ? (
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vfi-image-link"
                      >
                        View Image
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <span className={`vfi-status-badge ${item.isAvailable ? 'vfi-available' : 'vfi-unavailable'}`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="vfi-type">
                    {item.isVegetarian ? (
                      <span className="vfi-veg-indicator">🥦 Veg</span>
                    ) : (
                      <span className="vfi-non-veg-indicator">🍗 Non-Veg</span>
                    )}
                  </td>
                  <td className="vfi-customizations">
                    {item.customizations?.length > 0 ? (
                      <div className="vfi-customizations-list">
                        {item.customizations.map((cust, i) => (
                          <div key={i} className="vfi-customization-item">
                            <span className="vfi-customization-name">{cust.name}:</span>
                            <span className="vfi-customization-options">{cust.options.join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      'None'
                    )}
                  </td>
                  <td className="vfi-restaurant">
                    <button
                      className="vfi-view-restaurant-btn"
                      onClick={() => navigate(`/view-restaurant/${item.restaurantId?._id || item.restaurantId}`)}
                    >
                      View Restaurant
                    </button>
                  </td>
                  <td className="vfi-actions">
                    <button
                      className="vfi-action-btn vfi-delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button className="vfi-action-btn vfi-edit-btn">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="vfi-no-results">
                  No food items found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredItems.length > itemsPerPage && (
        <div className="vfi-pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="vfi-pagination-btn"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`vfi-pagination-btn ${currentPage === number ? 'vfi-active' : ''}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="vfi-pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewAllFoodItems;