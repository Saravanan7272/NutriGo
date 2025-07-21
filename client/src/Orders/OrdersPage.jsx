import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBoxOpen, FaUtensils, FaTruck, FaCheckCircle,
  FaStar, FaMapMarkerAlt, FaRedo
} from 'react-icons/fa';
import './OrdersPage.css';

const statusSteps = ['Processing', 'Preparing', 'On the way', 'Delivered'];

const OrdersPage = ({ orders }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <FaBoxOpen />;
      case 'Preparing': return <FaUtensils />;
      case 'On the way': return <FaTruck />;
      case 'Delivered': return <FaCheckCircle />;
      default: return <FaBoxOpen />;
    }
  };
  const navigate = useNavigate();
  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet </p>
          <Link to="/" className="continue-shopping">Home</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-row">
              <div className="order-main-info">
                <div className="order-meta">
                  <h4>Order Id #{order._id}</h4>
                  <p>Date:&nbsp;
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                </div>

                <div className="timeline-bar">
                  {statusSteps.map((step, i) => (
                    <div
                      key={step}
                      className={`timeline-step ${statusSteps.indexOf(order.status) >= i ? 'active' : ''}`}
                    >
                      {getStatusIcon(step)}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="order-compact-details">
                  <div className="items-column">
                    {order.items.map((item, i) => (
                      <div key={i} className="compact-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <p>{item.name}</p>
                          <p>X{item.quantity} - ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="summary-column">
                    <div className="address">
                      <FaMapMarkerAlt />
                      <span>
                        {order.deliveryInfo.address}, {order.deliveryInfo.city}
                      </span>
                    </div>
                    <div className="total-price">₹{order.total.toFixed(2)}</div>
                  </div>

                  <div className="action-buttons">
                    <button className="track-order-btn">Track</button>
                    {order.status === 'Delivered' && (
                      <>
                        <button
                          className="review-btn"
                          onClick={() => navigate(`/review/${order._id}`)}
                        >
                          <FaStar /> Leave Review
                        </button>
                        <button className="reorder-btn">
                          <FaRedo /> Reorder
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
