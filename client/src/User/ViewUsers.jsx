import React, { useEffect, useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import './ViewUsers.css';
import { API_ENDPOINTS,API_BASE_URL } from '../config/api.config';

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/View-all-users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Prepare CSV data
  const csvData = useMemo(() => {
    return filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone || 'N/A',
      Role: user.role,
      'Profile Image': user.profileImage || 'N/A',
      'Join Date': new Date(user.createdAt).toLocaleString()
    }));
  }, [filteredUsers]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="view-users-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-users-container">
        <div className="error-message">
          <p>⚠️ Error loading users: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-users-container">
      <div className="view-users-header">
        <h2>👥 User Management</h2>
        <div className="user-count">{filteredUsers.length} users found</div>
      </div>

      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <CSVLink
          data={csvData}
          filename={"users-export.csv"}
          className="export-btn"
        >
          Export to CSV
        </CSVLink>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Member Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="user-profile">
                    <div className="avatar-container">
                      <img
                        src={user.profileImage || 'https://via.placeholder.com/50'}
                        alt={user.name}
                        className="user-avatar"
                      />
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">ID: {user._id}</div>
                    </div>
                  </td>
                  <td className="user-contact">
                    <div className="user-email">{user.email}</div>
                    <div className="user-phone">{user.phone || '—'}</div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="join-date">
                    {new Date(user.createdAt).toLocaleDateString()}
                    <div className="join-time">
                      {new Date(user.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="user-actions">
                    <button className="action-btn view-btn">View</button>
                    <button className="action-btn edit-btn">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  No users found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > usersPerPage && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewUsers;