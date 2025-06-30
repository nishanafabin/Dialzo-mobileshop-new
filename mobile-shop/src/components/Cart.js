import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (item, action) => {
    const quantity = action === 'inc' ? item.quantity + 1 : item.quantity - 1;
    if (quantity < 1) return;

    try {
      await API.post('/cart', { ...item, quantity });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }
    
    try {
      console.log('=== CART DELETE DEBUG ===');
      console.log('Attempting to delete item with ID:', id);
      console.log('Current cart items:', cartItems);
      console.log('Token exists:', !!localStorage.getItem('token'));
      
      const response = await API.delete(`/cart/${id}`);
      console.log('Delete response:', response);
      console.log('=== END DEBUG ===');
      
      fetchCart();
    } catch (err) {
      console.error('=== CART DELETE ERROR ===');
      console.error('Error deleting item:', err);
      console.error('Error response:', err.response);
      console.error('Error details:', err.response?.data);
      console.error('Status:', err.response?.status);
      console.error('=== END ERROR ===');
      
      alert(`Failed to remove item. Error: ${err.response?.data?.message || err.message}`);
    }
  };

  // Place order (clear cart)
  const placeOrder = async () => {
    if (!window.confirm('Are you sure you want to place this order? This will clear your cart.')) {
      return;
    }
    
    try {
      await API.delete('/cart');
      setCartItems([]);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="cart-container">
        <h2 className="text-center mt-5">Loading your cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <h2 className="text-center mt-5 text-danger">{error}</h2>
        <button onClick={fetchCart} className="btn btn-primary d-block mx-auto mt-3">
          Try Again
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="text-center mt-5">🛒 Your Cart is Empty</h2>
        <p className="text-center">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.productId} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-image" />
          <div className="cart-details">
            <h5>{item.name}</h5>
            <p>Price: ₹{item.price}</p>
            <div className="quantity-control">
              <button onClick={() => updateQuantity(item, 'dec')}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item, 'inc')}>+</button>
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => deleteItem(item.productId)}
          >
            🗑️
          </button>
        </div>
      ))}
      <div className="cart-summary">
        <h4>Total: ₹{total}</h4>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
