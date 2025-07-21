import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './ADMIN/AdminDashboard';
import RestaurantAdminDashboard from './Res-Admin/RestaurantAdminDashboard';

const Profile = ({ userType, userName }) => {
  const navigate = useNavigate();



  console.log(userName, userType);
  useEffect(() => {
    if (!userType || !userName) {
      const timer = setTimeout(() => navigate('/login'), 2000); // Optional: redirect after 2s
      return () => clearTimeout(timer);
    }
  }, [userType, userName, navigate]);

  if (!userType || !userName)
    return (
      <h3 style={{ paddingTop: '100px', textAlign: 'center', color: 'red' }}>
        Loading user details...
      </h3>
    );

  if (userType === 'admin') {
    return <AdminDashboard />;
  }

  if (userType === 'restaurantOwner') {
    return <RestaurantAdminDashboard />;
  }

  // Default: Customer view
  return (
    <div className="dashboard">
      <h2 style={{ paddingTop: '100px', textAlign: 'center' }}>Welcome, {userName}!</h2>
      <p style={{ paddingTop: '20px', textAlign: 'center', color: 'green' }}>
        🎉 You're logged in as a <b>Customer</b>.
      </p>
    </div>
  );
};

export default Profile;
