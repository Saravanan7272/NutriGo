import React, { useState } from 'react';
import './AddRestaurant.css';
import { FaUser, FaLock, FaMapMarkerAlt, FaImage, FaClock, FaRupeeSign, FaStore } from 'react-icons/fa';
const cuisineOptions = ['Indian', 'Chinese', 'Italian', 'Mexican', 'Thai', 'French'];
import { API_ENDPOINTS} from '../config/api.config';
function AddRestaurant() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: [],
    address: '',
    locationLat: '',
    locationLng: '',
    images: [''],
    openHours: '',
    minOrderAmount: '',
    deliveryFee: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.username.trim()) newErrors.username = 'Username required';
    if (!formData.password.trim()) newErrors.password = 'Password required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCuisineChange = (cuisine) => {
    setFormData((prev) => {
      const exists = prev.cuisine.includes(cuisine);
      return {
        ...prev,
        cuisine: exists
          ? prev.cuisine.filter(c => c !== cuisine)
          : [...prev.cuisine, cuisine],
      };
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
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
      name: formData.name,
      description: formData.description,
      cuisine: formData.cuisine,
      address: formData.address,
      location: {
        lat: parseFloat(formData.locationLat),
        lng: parseFloat(formData.locationLng),
      },
      images: formData.images.filter(Boolean),
      openHours: formData.openHours,
      minOrderAmount: parseFloat(formData.minOrderAmount),
      deliveryFee: parseFloat(formData.deliveryFee),
      rating: 0,
      ownerCredentials: {
        username: formData.username,
        password: formData.password,
      },
    };

    try {
      const res = await fetch(`${API_ENDPOINTS.RESTAURANT_ADD}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Restaurant added successfully!');
        setFormData({
          name: '', description: '', cuisine: [], address: '', locationLat: '',
          locationLng: '', images: [''], openHours: '', minOrderAmount: '',
          deliveryFee: '', username: '', password: ''
        });
      } else {
        setMessage(result.error || ' Submission failed');
      }
    } catch (err) {
      setMessage(' Server error');
    }
  };

  return (
    <div className="formContainer-wrapper">
      <div className="formContainer">
        <h2 className="formTitle">Add New Restaurant</h2>
        <form onSubmit={handleSubmit} className="restaurantForm">
          <div className="input-icon-group">
            <FaStore />
            <input name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
          </div>
          {errors.name && <span className="error-text">{errors.name}</span>}

          <div className="description-wrapper input-icon-group">
            <FaImage />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="cuisine-section">
            <label>Select Cuisines:</label>
            <div className="cuisine-options">
              {cuisineOptions.map((cuisine) => (
                <label key={cuisine} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.cuisine.includes(cuisine)}
                    onChange={() => handleCuisineChange(cuisine)}
                  />
                  {cuisine}
                </label>
              ))}
            </div>
          </div>

          <div className="input-icon-group">
            <FaMapMarkerAlt />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
          </div>
          {errors.address && <span className="error-text">{errors.address}</span>}

          <div className="coordinates-group">
            <div className="input-icon-group">
              <FaMapMarkerAlt />
              <input
                name="locationLat"
                placeholder="Latitude"
                value={formData.locationLat}
                onChange={handleChange}
              />
            </div>
            <div className="input-icon-group">
              <FaMapMarkerAlt />
              <input
                name="locationLng"
                placeholder="Longitude"
                value={formData.locationLng}
                onChange={handleChange}
              />
            </div>
          </div>
          <label>Image URLs:</label>
          {formData.images.map((url, idx) => (
            <div className="image-input-group" key={idx}>
              <div className="input-icon-group">
                <FaImage />
                <input
                  type="text"
                  value={url}
                  placeholder={`Image URL ${idx + 1}`}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                />
              </div>
              {idx === formData.images.length - 1 && (
                <button type="button" onClick={addImageField} className="add-btn">+</button>
              )}
            </div>
          ))}

          <div className="input-icon-group">
            <FaClock />
            <input name="openHours" placeholder="Open Hours (e.g. 10AM - 9PM)" value={formData.openHours} onChange={handleChange} />
          </div>

          <div className="input-icon-group">
            <FaRupeeSign />
            <input name="minOrderAmount" placeholder="Min Order Amount (₹)" value={formData.minOrderAmount} onChange={handleChange} />
          </div>

          <div className="input-icon-group">
            <FaRupeeSign />
            <input name="deliveryFee" placeholder="Delivery Fee (₹)" value={formData.deliveryFee} onChange={handleChange} />
          </div>

          <hr />

          <div className="input-icon-group">
            <FaUser />
            <input name="username" placeholder="Owner Username" value={formData.username} onChange={handleChange} className={errors.username ? 'error' : ''} />
          </div>
          {errors.username && <span className="error-text">{errors.username}</span>}

          <div className="input-icon-group">
            <FaLock />
            <input name="password" type="password" placeholder="Owner Password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}

          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default AddRestaurant;
