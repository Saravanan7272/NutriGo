import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signUpWithEmail,
  logInWithEmail,
  logInWithGoogle,
  resetPassword
} from '../firebase/firebaseConfig';
import { useAuth } from './AuthProvider';
import '../auth.css';

export default function AuthPage({ mode = 'login', userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser, profileCompleted } = useAuth();
  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';
  useEffect(() => {
    console.log(mode);
    if (currentUser) {
      if (!profileCompleted && mode === 'signup' && userType === 'customer') {
        navigate('/profile-info');
      } else {
        navigate('/');
      }
    }
  }, [currentUser, profileCompleted, navigate]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (isLogin) await logInWithEmail(email, password);
      if (isSignup) {
        await signUpWithEmail(email, password);
        setMessage('Account created! Redirecting...');
      }
      if (isReset) {
        await resetPassword(email);
        setMessage('Reset email sent.');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await logInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-container">
      <div className={`auth-container ${loading ? 'auth-loading' : ''}`}>
        <h2 className="auth-title">
          {isLogin ? 'Login' : isSignup ? 'Sign Up' : 'Reset Password'}
        </h2>
        {message && <div className="auth-alert auth-alert-success">{message}</div>}
        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          {(isLogin || isSignup) && (
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          )}
          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : isSignup ? 'Sign Up' : 'Reset Password'}
          </button>
        </form>
        {(isLogin || isSignup) && (
          <button onClick={handleGoogleSignIn} className="auth-btn-google" disabled={loading}>
            {isLogin ? 'Login with Google' : 'Sign up with Google'}
          </button>
        )}
        <div className="auth-links">
          {isLogin ? (
            <>
              <Link to="/reset-password" className="auth-link">Forgot Password?</Link>
              <Link to="/signup" className="auth-link">Need account? Sign Up</Link>
            </>
          ) : isSignup ? (
            <Link to="/login" className="auth-link">Already have an account? Login</Link>
          ) : (
            <Link to="/login" className="auth-link">Back to Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}