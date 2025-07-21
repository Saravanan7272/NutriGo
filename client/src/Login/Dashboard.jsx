import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setMessage('Successfully logged out.');
      setTimeout(() => navigate('/login'), 1500); // redirect after message
    } catch (error) {
      setMessage('Logout failed.');
      console.error(error);
    }
  };

  const forceFullLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // ensures Firebase session is cleared
      await logout();      // clears localStorage and context
      setMessage('Full logout completed.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage('Force logout failed.');
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Hello, {currentUser?.displayName || currentUser?.email.split('@')[0] || 'User'}!</p>

      <button onClick={handleLogout} className="btn-primary">Logout</button>
      <button onClick={forceFullLogout} className="btn-warning" style={{ marginLeft: '1rem' }}>
        Force Logout (Dev)
      </button>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`} style={{ marginTop: '1rem' }}>
          {message}
        </div>
      )}

      {/* Back to Login button for manual navigation */}
      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={() => navigate('/login')} className="btn-secondary">
          Back to Login
        </button>
      </div>
    </div>
  );
}
