// src/pages/AdminLogin.js
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import './AdminLogin.css' // reuse same styles
import { jwtDecode } from 'jwt-decode'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Redirect if already logged in as admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === 'admin') {
          navigate('/admin');
        }
      } catch (err) {
        // Invalid token, do nothing
      }
    }
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await API.post('/auth/login', { email, password })
      const { token, user } = res.data

      if (user.role !== 'admin') {
        setError('Access denied: Not an admin')
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login as Admin</button>
        <p className="link">
          Back to <a href="/">Home</a>
        </p>
      </form>
    </div>
  )
}

export default AdminLogin
