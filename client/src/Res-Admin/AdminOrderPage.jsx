const AdminOrderPage = ({ orders, updateOrderStatus }) => {
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="admin-orders">
      <h1>Customer Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.deliveryInfo.name}</td>
              <td>{order.items.length} items</td>
              <td>₹{order.total.toFixed(2)}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Preparing">Preparing</option>
                  <option value="On the way">On the way</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleStatusChange(order.id, 'Delivered')}>
                  Mark Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderPage;