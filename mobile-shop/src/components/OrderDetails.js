import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        const found = res.data.find(o => o._id === orderId);
        if (!found) {
          setError('Order not found.');
        } else {
          setOrder(found);
        }
      } catch (err) {
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="container mt-5"><h2>Loading order details...</h2></div>;
  if (error) return <div className="container mt-5"><h2>{error}</h2></div>;
  if (!order) return null;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="card order-card mb-3">
        <div className="card-body">
          <h4 className="card-title mb-3">Order #{order._id}</h4>
          <p className="order-date">Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="order-status">Status: <strong>{order.status}</strong></p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img src={item.image || item.imageUrl || item.imageURL || item.img || (Array.isArray(item.images) && item.images.length ? item.images[0] : 'https://via.placeholder.com/48?text=?')} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/48?text=?' }} />
                <span>{item.name} x {item.quantity} - ₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h5>Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h5>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 