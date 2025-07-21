import React from 'react';

const ItemDetailsModal = ({
  item,
  favorites,
  toggleFavorite,
  cart,
  handleIncrement,
  handleDecrement,
  onClose
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div
          className="modal-food-image"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
          role="img"
          aria-label={item.name}
        />
        <div className="modal-details">
          <div className="modal-header-icons">
            <button
              className={`modal-fav-icon ${favorites.includes(item._id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(item._id)}
              aria-label={favorites.includes(item._id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorites.includes(item._id) ? '❤️' : '🤍'}
            </button>
            <button
              className="close-modal"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <h2>{item.name}</h2>
          <p className="item-type">
            {item.category} {item.isVegetarian ? '🟢 Veg' : '🔴 Non-Veg'}
          </p>
          <div className="price">₹{item.price.toFixed(2)}</div>
          <p className="description">{item.description}</p>
          <p><strong>Availability:</strong> {item.isAvailable ? '✅ In stock' : '❌ Not available'}</p>

          {item.customizations?.length > 0 && (
            <div className="customizations">
              <strong>Customizations:</strong>
              <ul>
                {item.customizations.map((cust, idx) => (
                  <li key={idx}>
                    {cust.name}: {cust.options.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-actions">
            <div className="cart-controls">
              {cart[item._id] ? (
                <>
                  <button
                    onClick={() => handleDecrement(item._id)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{cart[item._id]}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    aria-label="Increase quantity"
                  >
                    ＋
                  </button>
                </>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => handleIncrement(item._id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;