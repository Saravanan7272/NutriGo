import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import './profile.css';

function Profile_Info() {
  const { currentUser, completeProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'customer',
    profileImage: '',
    addresses: [{ label: '', street: '', city: '', pincode: '' }],
    favorites: {
      desserts: [''],
      fastFood: [''],
      mainCourse: ['']
    }
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const avatarOptions = [
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571914/jzuuccvnf18ilcdfky4p.jpg',
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571971/jj94opfti4fkmt3uvcqk.jpg',
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571989/sasfddrph4a7dyghqxwo.jpg'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...formData.addresses];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, addresses: updated }));
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { label: '', street: '', city: '', pincode: '' }]
    }));
  };

  const handleFavoriteChange = (type, index, value) => {
    const updated = [...formData.favorites[type]];
    updated[index] = value;
    setFormData(prev => ({
      ...prev,
      favorites: { ...prev.favorites, [type]: updated }
    }));
  };

  const addFavorite = (type) => {
    setFormData(prev => ({
      ...prev,
      favorites: {
        ...prev.favorites,
        [type]: [...prev.favorites[type], '']
      }
    }));
  };

  const isInvalidInput = () => {
    return (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.profileImage ||
      formData.addresses.some(
        (a) =>
          !a.label.trim() ||
          !a.street.trim() ||
          !a.city.trim() ||
          !a.pincode.trim()
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInvalidInput()) {
      setMessage("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    setMessage('');

    const payload = {
      ...formData,
      email: currentUser.email,
    };

    try {
      const res = await fetch('http://localhost:8000/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.text();

      if (res.ok) {
        setMessage("Profile saved! Redirecting...");
        completeProfile();
         navigate('/');
      } else {
        setMessage(`Error: ${result}`);
      }
    } catch (err) {
      setMessage('Error: Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add-user-container-wrapper'>
      <div className="add-user-container">
        <h2>👤 Complete Your Profile</h2>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="avatar-selection">
            <p>Select an Avatar:</p>
            <div className="avatar-grid">
              {avatarOptions.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`avatar-${index}`}
                  className={`avatar-option ${formData.profileImage === url ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, profileImage: url })}
                />
              ))}
            </div>
          </div>

          <select name="role" value={formData.role} onChange={handleChange} className="role-select">
            <option value="customer">Customer</option>
          </select>

          <h4>📍 Address(es)</h4>
          {formData?.addresses.map((addr, index) => (
            <div key={index}>
              <input
                placeholder="Label (e.g. Home)"
                value={addr.label}
                onChange={(e) => handleAddressChange(index, 'label', e.target.value)}
                required
              />
              <input
                placeholder="Street"
                value={addr.street}
                onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                required
              />
              <input
                placeholder="City"
                value={addr.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                required
              />
              <input
                placeholder="Pincode"
                value={addr.pincode}
                onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addAddress}>+ Add Another Address</button>

          <h4>🍽 Favorite Foods</h4>
          {['desserts', 'fastFood', 'mainCourse'].map(type => (
            <div key={type}>
              <p>{type}</p>
              {formData.favorites[type].map((item, idx) => (
                <input
                  key={idx}
                  placeholder={`Favorite ${type.slice(0, -1)} ${idx + 1}`}
                  value={item}
                  onChange={(e) => handleFavoriteChange(type, idx, e.target.value)}
                />
              ))}
              <button type="button" onClick={() => addFavorite(type)}>+ Add {type}</button>
            </div>
          ))}

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save & Continue'}
          </button>
        </form>

        {message && (
          <div className={`message ${message? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile_Info;
