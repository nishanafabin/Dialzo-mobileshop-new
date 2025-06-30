// src/pages/AdminProductDetails.js

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const categories = [
    'Smartphones',
    'Tablets',
    'Smartwatches',
    'Audio Devices',
    'Accessories',
    'Airpods'
  ]

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product)
      alert('✅ Product updated')
      setIsEditing(false)
    } catch (err) {
      alert('❌ Failed to update product')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?')
    if (!confirm) return

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      alert('🗑️ Product deleted')
      navigate('/admin')
    } catch (err) {
      alert('❌ Failed to delete product')
      console.error(err)
    }
  }

  if (!product) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container my-4">
      <h3>Product Details</h3>
      <hr />

      <div className="row">
        <div className="col-md-4">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              className="form-control"
              name="image"
              value={product.image}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleChange}
              disabled={!isEditing}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="d-flex gap-2">
            {isEditing ? (
              <button className="btn btn-success" onClick={handleUpdate}>Save</button>
            ) : (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductDetails
