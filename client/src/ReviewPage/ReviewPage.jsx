import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewPage.css';
import { API_ENDPOINTS} from '../config/api.config';

const ReviewPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRes = await fetch(`${API_ENDPOINTS.ORDER}/${orderId}`);
        if (!orderRes.ok) throw new Error(`Failed to fetch order: ${orderRes.status}`);
        const orderData = await orderRes.json();
        setOrderDetails(orderData);

        if (orderData.userId) {
          const userRes = await fetch(`${API_ENDPOINTS.USERS}/${orderData.userId}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            setUserDetails(userData);
          }
        }

        if (orderData.restaurantId) {
          const restaurantRes = await fetch(`${API_ENDPOINTS.RESTAURANTS}/${orderData.restaurantId}`);
          if (restaurantRes.ok) {
            const restaurantData = await restaurantRes.json();
            setRestaurantDetails(restaurantData);
          }
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Some data couldn't be loaded, but you can still leave a review.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const getStatusColor = () => {
    switch (orderDetails?.status) {
      case "Preparing": return "#FFE66D";
      case "On the way": return "#4ECDC4";
      case "Delivered": return "#6BCB77";
      default: return "#E0E0E0";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINTS.REVIEWS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: orderDetails?.userId || 'unknown',
          orderId,
          restaurantId: orderDetails?.restaurantId || 'unknown',
          rating,
          comment
        })
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        console.error("Failed to submit review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const getFavoriteCategories = () => {
    if (!userDetails?.favorites) return [];
    return Object.entries(userDetails.favorites)
      .filter(([_, items]) => items.length > 0)
      .map(([category]) => category);
  };

  const favoriteCategories = getFavoriteCategories();

  return (
    <div className="review-container">
      <header className="review-header">
        <div className="header-content">
          <h1>Share Your Dining Experience</h1>
          <p className="subheader">
            How was your meal from {restaurantDetails?.name || 'the restaurant'}?
          </p>
          <div className="order-status" style={{ backgroundColor: getStatusColor() }}>
            Order Status: {orderDetails?.status || 'Unknown'}
          </div>
          {error && <p className="error-message">⚠️ {error}</p>}
        </div>
      </header>

      <div className="review-content">
        <div className="user-profile-section">
          {userDetails && (
            <div className="user-card">
              <div className="user-avatar">
                <img
                  src={userDetails.profileImage || 'https://via.placeholder.com/150'}
                  alt={userDetails.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <div className="user-info">
                <h3>{userDetails.name || 'Anonymous'}</h3>
                <p>{userDetails.email}</p>
                {favoriteCategories.length > 0 && (
                  <div className="favorites-hint">
                    <p>Based on your favorites, you might enjoy:</p>
                    <div className="favorite-tags">
                      {favoriteCategories.map(category => (
                        <span key={category} className="tag">{category}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="review-card">
          {orderDetails && (
            <div className="order-summary">
              <h3><span className="icon">📦</span> Your Order Summary</h3>
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Order #:</span>
                  <span className="detail-value">{orderDetails._id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Restaurant:</span>
                  <span className="detail-value">{restaurantDetails?.name || 'Unknown Restaurant'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="items-list">
                  <span className="detail-label">Items Ordered:</span>
                  <ul>
                    {orderDetails.items.map((item, index) => (
                      <li key={index}>
                        <span className="item-icon">🍕</span>
                        {item.name} <span className="item-quantity">(x{item.quantity})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="review-form">
            <div className="rating-section">
              <h3><span className="icon">⭐</span> Rate Your Experience</h3>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
                <span className="rating-text">
                  {rating === 5 ? 'Excellent!' :
                    rating === 4 ? 'Good' :
                      rating === 3 ? 'Average' :
                        rating === 2 ? 'Below Average' :
                          rating === 1 ? 'Poor' : ''}
                </span>
              </div>
            </div>

            <div className="comment-section">
              <h3><span className="icon">✏️</span> Share Details</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What stood out about your meal and service?"
                rows="5"
                required
              />
              <p className="hint">Your feedback helps us improve!</p>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={rating === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : 'Submit Review'}
              </button>
              <button
                type="button"
                className="skip-button"
                onClick={() => navigate('/')}
              >
                Maybe Later
              </button>
            </div>
          </form>

          {submitSuccess && (
            <div className="success-message">
              <div className="success-content">
                <span className="success-icon">🎉</span>
                <h3>Thank You!</h3>
                <p>Your review helps us serve you better.</p>
                <button
                  className="continue-button"
                  onClick={() => navigate('/')}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;