import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import { handlePayment } from '../utils/handlePayment';
import { API_ENDPOINTS} from '../config/api.config';

const CartPage = ({ cart, setCart, popularItems, setOrders }) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'John Doe',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '555-123-4567'
  });

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeliveryPage, setIsDeliveryPage] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);


  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = popularItems.find(i => i._id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };


  const removeFromCart = (itemId) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    setCart(newCart);
  };


  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };


  const proceedToDelivery = () => {
    setIsDeliveryPage(true);
  };


  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = async () => {
    const expectedTotal = calculateTotal() + 49;



    const newOrder = {
      userId: '6866debe8c2c0974800b54ee',
      restaurantId: '685f9bdd5f6fd8eb51cffc25',
      items: Object.entries(cart).map(([itemId, quantity]) => {
        const item = popularItems.find(i => i._id === itemId);
        return {
          name: item.name,
          price: item.price,
          quantity,
          image: item.imageUrl
        };
      }),
      deliveryInfo,
      total: expectedTotal,
      status: 'Delivered'
    };

    try {
      const response = await fetch(API_ENDPOINTS.ORDERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const savedOrder = data.order;


      console.log('succes');
      setOrderSuccess(true);
      setOrders(prev => [...prev, savedOrder]);
      setCart({});

      setTimeout(() => {
        setIsDeliveryPage(false);
        navigate('/orders');
      }, 3000);
    } catch (err) {
      console.error("Failed to save order:", err.message);
    }


  };



  const createConfetti = () => {
    const colors = ['#00b894', '#0984e3', '#fdcb6e', '#e17055', '#6c5ce7'];
    return Array(30).fill().map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}vw`,
          bottom: '-10px',
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          animationDelay: `${i * 0.1}s`,
          position: 'fixed',
          zIndex: 9999
        }}
      />
    ));
  };

  if (orderSuccess) {
    return (
      <div className="order-success">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <h2>Order Successful! 🎉</h2>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="continue-shopping">Back to Home</Link>
        {createConfetti()}

      </div>
    );
  }

  if (isDeliveryPage) {
    return (
      <div className="delivery-page">

        <div className="delivery-header">
          <button
            className="back-to-cart"
            onClick={() => setIsDeliveryPage(false)}
          >
            &larr; Back to Cart
          </button>
          <h1>Delivery Information 📦</h1>
        </div>


        <div className="delivery-info-container">

          <div className="delivery-info">

            <h3>Delivery Address</h3>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={deliveryInfo.name}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={deliveryInfo.city}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={deliveryInfo.state}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={deliveryInfo.zip}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={deliveryInfo.phone}
                    onChange={handleDeliveryChange}
                  />
                </div>
                <div className="form-buttons">
                  <button
                    className="save-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Save Address
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="address-display">
                <div className="address-details">
                  <p><strong>{deliveryInfo.name}</strong></p>
                  <p>{deliveryInfo.address}</p>
                  <p>{deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zip}</p>
                  <p>Phone: {deliveryInfo.phone}</p>
                </div>
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Address
                </button>
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹49.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(calculateTotal() + 49).toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-section">
            <h3>Payment Summary</h3>
            <button
              className="proceed-payment"
              onClick={() =>

                handlePayment({
                  amount: calculateTotal() + 49,
                  userInfo: deliveryInfo,
                  onSuccess: async (payment) => {
                    await placeOrder();
                  },
                  onFailure: (err) => alert("Payment failed. Please try again.")
                })
              }
            >
              Pay ₹{(calculateTotal() + 49).toFixed(2)} Now
            </button>
          </div>

        </div>
      </div>
    );
  }



  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <table className="cart-items-table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = popularItems.find(i => i._id === itemId);
                if (!item) return null;

                return (
                  <tr key={itemId} className="cart-item">
                    <td>
                      <div className="item-image" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                    </td>
                    <td className="item-title">{item.name}</td>
                    <td className="item-price">₹{item.price.toFixed(2)}</td>
                    <td className="item-quantity">
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(itemId, quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(itemId, quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td className="item-total">₹{(item.price * quantity).toFixed(2)}</td>
                    <td className="item-remove">
                      <button className="remove-btn" onClick={() => removeFromCart(itemId)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Cart Total</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹49.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(calculateTotal() + 49).toFixed(2)}</span>
            </div>
            <button className="proceed-checkout" onClick={proceedToDelivery}>Proceed to Checkout</button>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );


};

export default CartPage;