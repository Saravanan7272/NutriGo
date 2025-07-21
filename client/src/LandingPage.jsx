import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1>Welcome to Dashboard Portal</h1>
      <div style={{ marginTop: '30px' }}>
        <button
          style={{ padding: '10px 20px', marginRight: '20px' }}
          onClick={() => navigate('/admin')}
        >
          Admin Dashboard
        </button>

        <button
          style={{ padding: '10px 20px' }}
          onClick={() => navigate('/restaurant-admin')}
        >
          Restaurant Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
