import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await API.get('/admin/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await API.delete(`/admin/orders/${orderId}`);
      fetchOrders();
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>All Orders</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Date</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId?.email}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <ul className="list-unstyled mb-0">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
