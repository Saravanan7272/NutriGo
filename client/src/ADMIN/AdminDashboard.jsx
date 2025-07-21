import { useState } from 'react';
import { FaTachometerAlt, FaUtensils, FaPlus, FaUsers, FaCommentAlt, FaHeadset, FaChartLine, FaChartPie, FaCog, FaSignOutAlt, FaSearch, FaBell, FaBook, FaExchangeAlt, FaUserPlus, FaList } from 'react-icons/fa';

import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', path: '/' },
    { id: 'add-restaurant', icon: <FaUtensils />, label: 'Add Restaurant', path: '/add-restaurant' },
    { id: 'view-restaurants', icon: <FaList />, label: 'View Restaurants', path: '/view-restaurants' },
    { id: 'add-users', icon: <FaUtensils />, label: 'AddUser', path: '/add-users' },
    { id: 'view-users', icon: <FaUsers />, label: 'View Users', path: '/view-users' },
    { id: 'feedback', icon: <FaCommentAlt />, label: 'Customer Feedback' },
    { id: 'helpdesk', icon: <FaHeadset />, label: 'Help Desk' },
    { id: 'analytics', icon: <FaChartLine />, label: 'Business Analytics' },
    { id: 'reports', icon: <FaChartPie />, label: 'Sales Reports' },
    { id: 'settings', icon: <FaCog />, label: 'System Settings' },
    { id: 'logout', icon: <FaSignOutAlt />, label: 'Logout', path: '/logout' }
  ];


  const stats = [
    { value: '245', label: 'Total Restaurants', icon: <FaUtensils />, color: 'blue' },
    { value: '1,586', label: 'Active Customers', icon: <FaUsers />, color: 'green' },
    { value: '327', label: 'Orders Today', icon: <FaBook />, color: 'orange' },
    { value: '12', label: 'Pending Issues', icon: <FaHeadset />, color: 'red' }
  ];

  const quickActions = [
    { title: 'Add Restaurant', description: 'Add new restaurant to platform', icon: <FaUtensils />, color: 'blue' },
    { title: 'Add Admin', description: 'Register new admin user', icon: <FaUserPlus />, color: 'green' },
    { title: 'Process Order', description: 'Manage food orders', icon: <FaBook />, color: 'purple' },
    { title: 'Update Menu', description: 'Edit restaurant menu items', icon: <FaExchangeAlt />, color: 'orange' }
  ];

  const recentActivities = [
    { type: 'New Restaurant', description: '"Burger King" was added to platform', time: '10 min ago', icon: <FaUtensils />, color: 'blue' },
    { type: 'Order Placed', description: 'Order #FD2023001 placed by John Doe', time: '25 min ago', icon: <FaBook />, color: 'green' },
    { type: 'Order Delivered', description: 'Order #FD2023000 delivered successfully', time: '1 hour ago', icon: <FaExchangeAlt />, color: 'orange' },
    { type: 'New User', description: 'Robert Johnson registered as customer', time: '2 hours ago', icon: <FaUserPlus />, color: 'blue' },
    { type: 'Complaint Received', description: 'Food quality complaint from Jane Smith', time: '3 hours ago', icon: <FaHeadset />, color: 'green' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setActiveMenu(path);
  };

  return (
    <div className={`admin-dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Food Delivery System</p>
        </div>

        <div className="sidebar-menu">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`menu-item ${activeMenu === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}

            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="user-profile">
            <div className="notification-bell">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>
            <div className="user-avatar">AD</div>
            <div className="user-name">Admin User</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="content-wrapper">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <h1>Welcome back, Admin!</h1>
            <p>Here's what's happening with your food delivery platform today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className={`stat-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="section-title">
              <h2>Quick Actions</h2>
            </div>

            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <div className="action-card" key={index}>
                  <div className={`action-icon ${action.color}`}>
                    {action.icon}
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <div className="section-title">
              <h2>Recent Activity</h2>
            </div>

            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li className="activity-item" key={index}>
                  <div className={`activity-icon ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.type}</h4>
                    <p>{activity.description}</p>
                  </div>
                  <div className="activity-time">
                    {activity.time}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;