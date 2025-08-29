// src/pages/AdminPanel.js

import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SearchContext } from '../context/SearchContext'
import AddProduct from './AddProduct'

const AdminPanel = () => {
  const [products, setProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const { searchTerm } = useContext(SearchContext)

  const categories = [
    'Smartphones',
    'Tablets',
    'Smartwatches',
    'Audio Devices',
    'Accessories',
    'Airpods'
  ]
  const url = process.env.REACT_APP_ENDPOINT_URL;
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/api/products`)
      setProducts(res.data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || p.category === selectedCategory)
  )

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      <p>Welcome, Admin! Manage your mobile shop below.</p>
      <hr />

      {/* Add + Category Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <button
          className="btn btn-outline-dark"
          onClick={() => setShowAddForm(prev => !prev)}
        >
          {showAddForm ? 'Hide Add Product' : '➕ Add New Product'}
        </button>

        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Add Product Form */}
      {showAddForm && <AddProduct onProductAdded={fetchProducts} />}

      <h4>Manage Products</h4>

      {filteredProducts.length === 0 ? (
        <p className="text-muted">No products found for "{searchTerm}"</p>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product._id} className="col-md-3 mb-3">
              <Link to={`/admin/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card h-100 hover-shadow">
                  <img src={product.image} alt={product.name} className="card-img-top" />
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p>₹{product.price}</p>
                    <p className="text-muted">{product.category}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPanel
