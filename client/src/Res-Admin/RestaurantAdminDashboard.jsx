import { useState } from 'react';
import {
  FaTachometerAlt,
  FaUtensils,
  FaUsers,
  FaCommentAlt,
  FaHeadset,
  FaChartLine,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaHamburger,
  FaListAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './RestaurantAdminDashboard.css'
const RestaurantAdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', path: '/restaurant-admin' },
    { id: 'view-restaurant', icon: <FaUtensils />, label: 'My Restaurant', path: '/restaurant/view' },
    { id: 'menu', icon: <FaHamburger />, label: 'Menu Management', path: '/food-items' },
    { id: 'food', icon: <FaHamburger />, label: 'Add Food Items', path: '/add-food-item' },
    { id: 'customers', icon: <FaUsers />, label: 'Customers', path: '/view-users' },
    { id: 'orders', icon: <FaListAlt />, label: 'Orders', path: '/restaurant-orders' },
    { id: 'feedback', icon: <FaCommentAlt />, label: 'Feedback', path: '/restaurant-feedback' },
    { id: 'helpdesk', icon: <FaHeadset />, label: 'Help Desk', path: '/restaurant-helpdesk' },
    { id: 'analytics', icon: <FaChartLine />, label: 'Analytics', path: '/restaurant-analytics' },
    { id: 'reports', icon: <FaChartPie />, label: 'Reports', path: '/restaurant-reports' },
    { id: 'settings', icon: <FaCog />, label: 'Settings', path: '/restaurant-settings' },
    { id: 'logout', icon: <FaSignOutAlt />, label: 'Logout', path: '/logout' }
  ];


  const stats = [
    { value: '45', label: 'Today\'s Orders', icon: <FaListAlt />, color: 'primary' },
    { value: '1,586', label: 'Total Customers', icon: <FaUsers />, color: 'success' },
    { value: '4.8', label: 'Average Rating', icon: <FaCommentAlt />, color: 'warning' },
    { value: '3', label: 'Pending Issues', icon: <FaHeadset />, color: 'error' }
  ];

  const quickActions = [
    { title: 'Add Menu Item', description: 'Add new item to your menu', icon: <FaHamburger />, color: 'primary' },
    { title: 'View Orders', description: 'Check current orders', icon: <FaListAlt />, color: 'success' },
    { title: 'Update Profile', description: 'Edit restaurant details', icon: <FaUtensils />, color: 'secondary' },
    { title: 'View Analytics', description: 'See performance metrics', icon: <FaChartLine />, color: 'accent' }
  ];

  const recentActivities = [
    { type: 'New Order', description: 'Order #RST2023001 from John Doe', time: '10 min ago', icon: <FaListAlt />, color: 'primary' },
    { type: 'Order Completed', description: 'Order #RST2023000 delivered', time: '25 min ago', icon: <FaListAlt />, color: 'success' },
    { type: 'New Review', description: '5-star rating from Jane Smith', time: '1 hour ago', icon: <FaCommentAlt />, color: 'warning' },
    { type: 'New Customer', description: 'Robert Johnson ordered first time', time: '2 hours ago', icon: <FaUsers />, color: 'primary' },
    { type: 'Support Ticket', description: 'Complaint about delivery time', time: '3 hours ago', icon: <FaHeadset />, color: 'error' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setActiveMenu(path);
  };

  return (
    <div className={`res-admin-dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <div className="res-sidebar">
        <div className="res-sidebar-header">
          <h2>Restaurant Panel</h2>
          <p>Food Delivery System</p>
        </div>

        <div className="res-sidebar-menu">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`res-menu-item ${activeMenu === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="res-menu-icon">{item.icon}</span>
              <span className="res-menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="res-main-content">
        {/* Top Navigation Bar */}
        <div className="res-top-nav">
          <button className="res-sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="res-search-bar">
            <FaSearch className="res-search-icon" />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="res-user-profile">
            <div className="res-notification-bell">
              <FaBell />
              <span className="res-notification-badge">3</span>
            </div>
            <div className="res-user-avatar">RA</div>
            <div className="res-user-name">Restaurant Admin</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="res-content-wrapper">
          {/* Welcome Banner */}
          <div className="res-welcome-banner">
            <h1>Welcome back, Restaurant Admin!</h1>
            <p>Here's what's happening with your restaurant today.</p>
          </div>

          {/* Stats Cards */}
          <div className="res-stats-grid">
            {stats.map((stat, index) => (
              <div className="res-stat-card" key={index}>
                <div className={`res-stat-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="res-stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="res-quick-actions">
            <div className="res-section-title">
              <h2>Quick Actions</h2>
            </div>

            <div className="res-actions-grid">
              {quickActions.map((action, index) => (
                <div className="res-action-card" key={index}>
                  <div className={`res-action-icon ${action.color}`}>
                    {action.icon}
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="res-recent-activity">
            <div className="res-section-title">
              <h2>Recent Activity</h2>
            </div>

            <ul className="res-activity-list">
              {recentActivities.map((activity, index) => (
                <li className="res-activity-item" key={index}>
                  <div className={`res-activity-icon ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="res-activity-content">
                    <h4>{activity.type}</h4>
                    <p>{activity.description}</p>
                  </div>
                  <div className="res-activity-time">
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

export default RestaurantAdminDashboard;