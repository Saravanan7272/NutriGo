import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { currentUser, profileCompleted, loading } = useAuth();

if (loading) return <div>Loading...</div>;
if (!currentUser) return <Navigate to="/login" replace />;
if (!profileCompleted && location.pathname !== '/profile-info') {
  return <Navigate to="/profile-info" replace />;
}

  return children;
}
