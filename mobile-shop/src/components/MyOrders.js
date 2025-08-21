import React, { useEffect, useState } from 'react';
import API from '../utils/api'; // <-- Use the shared API utility
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container mt-5"><h2>Loading your orders...</h2></div>;
  if (error) return <div className="container mt-5"><h2>{error}</h2></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-orders-page">
          <p className="text-muted text-center">You have no orders yet.</p>
        </div>
      ) : (
        <div className="row g-3">
          {orders.map(order => (
            <div key={order._id} className="col-12 col-md-6 col-lg-4">
              <div className="card order-card h-100" onClick={() => navigate(`/my-orders/${order._id}`)}>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Order #{order._id.slice(-6)}</h5>
                    <span className={`badge order-status-badge status-${order.status?.toLowerCase() || 'pending'}`}>{order.status || 'Pending'}</span>
                  </div>
                  <p className="card-text mb-1"><small>Date: {new Date(order.createdAt).toLocaleString()}</small></p>
                  <ul className="order-items-list mb-2">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="order-item">
                        {item.name} <span className="order-item-qty">x {item.quantity}</span> <span className="order-item-price">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <strong className="order-total">Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong>
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

export default MyOrders; 