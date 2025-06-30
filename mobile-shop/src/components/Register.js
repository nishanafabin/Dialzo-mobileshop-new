import React, { useState } from 'react'
import API from '../utils/api'
import './Login.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
  e.preventDefault()
  setError('')
  setSuccess('')

  try {
    await API.post('/auth/register', { name, email, password })
    setSuccess('✅ Registered successfully! Please login.')
    setName('')
    setEmail('')
    setPassword('')
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed')
  }
}


  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        {success && <p className="success">{success}</p>}
        <button type="submit">Register</button>
        <p className="link">
            Already have an account? <a href="/login">Login here</a>
            </p>

      </form>
    </div>
  )
}

export default Register
