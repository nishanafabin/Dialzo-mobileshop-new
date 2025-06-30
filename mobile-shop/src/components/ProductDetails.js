import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../utils/api'
import './ProductDetails.css' // <-- Import custom CSS

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error loading product:', err))
  }, [id])

  const increment = () => setQuantity(prev => prev + 1)

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity
      };
      
      await API.post('/cart', cartItem);
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="product-container container product-details">
      <div className="row align-items-start">
        <div className="col-md-5 text-center">
          <img src={product.image} alt={product.name} className="img-fluid product-image" />
        </div>

        <div className="col-md-7">
          <h2 className="mb-3">{product.name}</h2>
          <h4 className="text-success mb-2">₹{product.price}</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.description || 'No description provided.'}</p>

          <div className="d-flex align-items-center my-3">
            <button onClick={decrement} className="btn btn-outline-secondary me-3">-</button>
            <span className="fs-5">{quantity}</span>
            <button onClick={increment} className="btn btn-outline-secondary ms-3">+</button>
          </div>

          <button onClick={handleAddToCart} className="btn btn-dark px-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
