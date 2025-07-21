import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './assets/style/Homepage.css';
import { useAuth } from './Login/auth/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
const Navbar = ({ userType, userName, cartCount = 0, favCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">NutriGo</div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link>
        <Link to="/all-restaurants" className={location.pathname === '/all-restaurants' ? 'active-link' : ''}>Browse Restaurants</Link>
        <Link to="/orders" className={location.pathname === '/orders' ? 'active-link' : ''}>My Orders</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>About Us</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Contact Us</Link>
      </div>

      <div className="nav-actions">
        {!currentUser ? (
          <button className="btn" onClick={() => navigate('/login')}>Sign in</button>
        ) : (
          <>
            <div className="nav-user-icon-container">
              <FaUserCircle
                className="nav-user-icon-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />

              {userMenuOpen && (
                <div className="nav-user-dropdown">
                  <button
                    className="nav-dropdown-item"
                    onClick={() =>
                      navigate('/Profile', {
                        state: {
                          userType: userType,
                          userName: userName,
                        },
                      })
                    }
                  >
                    <FiUser /> Profile
                  </button>

                  <button className="nav-dropdown-item">
                    <FiSettings /> Settings
                  </button>
                  <button className="nav-dropdown-item" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
            <Link to="/favorites" className="heart-icon" title="Your Favorites">
              ❤️<span className="fav-count">{favCount}</span>
            </Link>
          </>
        )}
        <Link to="/cart" className="cart-icon" title="Your Cart">
          🛒<span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
