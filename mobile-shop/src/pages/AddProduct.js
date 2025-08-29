// src/pages/AddProduct.js
import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
  })

  const categories = [
    'Smartphones',
    'Tablets',
    'Smartwatches',
    'Audio Devices',
    'Accessories',
    'Airpods'
  ]
const url = process.env.REACT_APP_ENDPOINT_URL;
  const handleChange = e => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(`${url}/api/products`, product)
      alert('✅ Product added successfully!')
      setProduct({ name: '', price: '', image: '', category: '', description: '' })
      onProductAdded()
    } catch (err) {
      alert('❌ Failed to add product')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <h4>Add New Product</h4>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
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
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
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
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  )
}

export default AddProduct
