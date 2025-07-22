import React, { useState } from 'react';
import { FaUtensils, FaList, FaAlignLeft, FaRupeeSign, FaImage, FaCheck, FaTimes, FaPlus, FaStore } from 'react-icons/fa';
import './AddFoodItem.css';
import { API_ENDPOINTS} from '../config/api.config';
function AddFoodItem() {
  const [formData, setFormData] = useState({
    restaurantId: '',
    name: '',
    category: '',
    description: '',
    price: '',
    imageUrl: '',
    isAvailable: true,
    isVegetarian: false,
  });

  const [customizations, setCustomizations] = useState([
    { name: '', options: [''] }
  ]);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const categoryOptions = ['Starter', 'Main Course', 'Fast Food', 'Dessert', 'Beverage'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.restaurantId.trim()) newErrors.restaurantId = 'Restaurant ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    return newErrors;
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCustomizationNameChange = (index, value) => {
    const updated = [...customizations];
    updated[index].name = value;
    setCustomizations(updated);
  };

  const handleOptionChange = (custIndex, optIndex, value) => {
    const updated = [...customizations];
    updated[custIndex].options[optIndex] = value;
    setCustomizations(updated);
  };

  const addCustomization = () => {
    setCustomizations([...customizations, { name: '', options: [''] }]);
  };

  const removeCustomization = (index) => {
    if (customizations.length > 1) {
      const updated = [...customizations];
      updated.splice(index, 1);
      setCustomizations(updated);
    }
  };

  const addOption = (custIndex) => {
    const updated = [...customizations];
    updated[custIndex].options.push('');
    setCustomizations(updated);
  };

  const removeOption = (custIndex, optIndex) => {
    if (customizations[custIndex].options.length > 1) {
      const updated = [...customizations];
      updated[custIndex].options.splice(optIndex, 1);
      setCustomizations(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      customizations: customizations.filter(c => c.name && c.options.some(opt => opt.trim())),
    };

    try {
      const res = await fetch(`${API_ENDPOINTS.ADD_FOOD_ITEM}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Food item added successfully!');
        setFormData({
          restaurantId: '',
          name: '',
          category: '',
          description: '',
          price: '',
          imageUrl: '',
          isAvailable: true,
          isVegetarian: false,
        });
        setCustomizations([{ name: '', options: [''] }]);
      } else {
        setMessage(result.error || 'Submission failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="food-item-formContainer-wrapper">
      <div className="food-item-formContainer">
        <h2 className="food-item-formTitle">🍔 Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="food-item-foodItemForm">
          {/* Restaurant ID */}
          <div className="food-item-input-icon-group">
            <FaStore />
            <input
              name="restaurantId"
              placeholder="Restaurant ID"
              value={formData.restaurantId}
              onChange={handleFormChange}
              className={errors.restaurantId ? 'food-item-error' : ''}
            />
          </div>
          {errors.restaurantId && <span className="food-item-error-text">{errors.restaurantId}</span>}

          {/* Food Name */}
          <div className="food-item-input-icon-group">
            <FaUtensils />
            <input
              name="name"
              placeholder="Food Item Name"
              value={formData.name}
              onChange={handleFormChange}
              className={errors.name ? 'food-item-error' : ''}
            />
          </div>
          {errors.name && <span className="food-item-error-text">{errors.name}</span>}

          {/* Category */}
          <div className="food-item-category-section">
            <label>Select Category:</label>
            <div className="food-item-category-options">
              {categoryOptions.map((category) => (
                <label key={category} className="food-item-radio-label">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={handleFormChange}
                  />
                  {category}
                </label>
              ))}
            </div>
            {errors.category && <span className="food-item-error-text">{errors.category}</span>}
          </div>

          {/* Description */}
          <div className="food-item-description-wrapper food-item-input-icon-group">
            <FaAlignLeft />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>

          {/* Price */}
          <div className="food-item-input-icon-group">
            <FaRupeeSign />
            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleFormChange}
              className={errors.price ? 'food-item-error' : ''}
              type="number"
              step="0.01"
            />
          </div>
          {errors.price && <span className="food-item-error-text">{errors.price}</span>}

          {/* Image URL */}
          <div className="food-item-input-icon-group">
            <FaImage />
            <input
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleFormChange}
              className={errors.imageUrl ? 'food-item-error' : ''}
            />
          </div>
          {errors.imageUrl && <span className="food-item-error-text">{errors.imageUrl}</span>}

          {/* Availability */}
          <div className="food-item-checkbox-group">
            <label className="food-item-checkbox-container">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleFormChange}
              />
              <span className="food-item-checkmark"></span>
              Available
            </label>
          </div>

          {/* Vegetarian */}
          <div className="food-item-checkbox-group">
            <label className="food-item-checkbox-container">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={formData.isVegetarian}
                onChange={handleFormChange}
              />
              <span className="food-item-checkmark"></span>
              Vegetarian
            </label>
          </div>

          {/* Customizations */}
          <div className="food-item-customizations-section">
            <label>🛠️ Customizations</label>
            {customizations.map((cust, custIndex) => (
              <div key={custIndex} className="food-item-customization-card">
                <div className="food-item-customization-header">
                  <div className="food-item-input-icon-group">
                    <FaList />
                    <input
                      placeholder="Customization Name (e.g. Size)"
                      value={cust.name}
                      onChange={(e) => handleCustomizationNameChange(custIndex, e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustomization(custIndex)}
                    className="food-item-remove-btn"
                    disabled={customizations.length <= 1}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="food-item-options-list">
                  {cust.options.map((opt, optIndex) => (
                    <div key={optIndex} className="food-item-option-item">
                      <div className="food-item-input-icon-group">
                        <FaCheck />
                        <input
                          placeholder={`Option ${optIndex + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(custIndex, optIndex, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOption(custIndex, optIndex)}
                        className="food-item-remove-btn"
                        disabled={cust.options.length <= 1}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(custIndex)}
                    className="food-item-add-option-btn"
                  >
                    <FaPlus /> Add Option
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addCustomization}
              className="food-item-add-customization-btn"
            >
              <FaPlus /> Add Customization
            </button>
          </div>

          <button type="submit" className="food-item-submit-btn">Submit</button>
        </form>
        <p className={`food-item-message ${message.includes('success') ? 'food-item-success' : 'food-item-error'}`}>{message}</p>
      </div>
    </div>
  );
}

export default AddFoodItem;