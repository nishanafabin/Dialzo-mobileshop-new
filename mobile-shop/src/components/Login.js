import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import API from '../utils/api'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  // ✅ If token exists, redirect to homepage
  if (token) {
    return <Navigate to="/" />
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await API.post('/auth/login', { email, password })
      const { token, user } = res.data

      // Store token and user data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      
      window.location.href = '/' // or use navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
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

        <button type="submit">Login</button>
        <p className="link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  )
}

export default Login
