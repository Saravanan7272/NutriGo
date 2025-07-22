import React, { useState } from 'react';
import './AddUser.css';
import { API_ENDPOINTS} from '../config/api.config';
function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordHash: '',
    phone: '',
    role: 'customer',
    profileImage: ''
  });

  const [message, setMessage] = useState('');

  // Cloudinary avatar image URLs
  const avatarOptions = [
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571914/jzuuccvnf18ilcdfky4p.jpg',
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571971/jj94opfti4fkmt3uvcqk.jpg',
    'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1751571989/sasfddrph4a7dyghqxwo.jpg'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      addresses: [],
      favorites: {
        desserts: [],
        fastFood: [],
        mainCourse: []
      }
    };

    try {
      const res = await fetch(`${API_ENDPOINTS.USER_ADD}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.text();
      setMessage(res.ok ? `Success: ${result}` : `Error: ${result}`);

      if (res.ok) {
        setFormData({
          name: '',
          email: '',
          passwordHash: '',
          phone: '',
          role: 'customer',
          profileImage: ''
        });
      }
    } catch (err) {
      setMessage('Error: Server connection failed');
    }
  };

  return (
    <div className="add-user-container-wrapper">
      <div className="add-user-container">
        <h2>👤 Add New User</h2>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="passwordHash"
            type="password"
            placeholder="Password"
            value={formData.passwordHash}
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="role-select"
          >
            <option value="customer">Customer</option>
            <option value="restaurantOwner">Restaurant Owner</option>
            <option value="admin">Admin</option>
            <option value="deliveryPartner">Delivery Partner</option>
          </select>

          <button type="submit">Add User</button>
        </form>

        {message && (
          <div className={`message ${message.startsWith('Success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUser;