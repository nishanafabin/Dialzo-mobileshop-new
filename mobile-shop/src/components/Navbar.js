import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { SearchContext } from '../context/SearchContext'
import API from '../utils/api'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { searchTerm, setSearchTerm } = useContext(SearchContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCartCount(0)
    navigate('/login')
  }

  const fetchCartCount = async () => {
    try {
      const res = await API.get('/cart')
      const count = res.data.reduce((total, item) => total + item.quantity, 0)
      setCartCount(count)
    } catch (err) {
      console.error('Error fetching cart count:', err)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCartCount()
    }
  }, [])

  const isLoggedIn = !!localStorage.getItem('token')

  return (
    <nav className="custom-navbar">
      <div className="navbar-logo">
        <div>
          <i className=""></i>
          <Link to="/" className="navbar-brand">Dialzo</Link>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <i className="fa fa-search search-icon"></i>
        </div>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
        <li>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
        <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin Panel</Link></li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/my-orders" onClick={() => setIsOpen(false)}>My Orders</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-link nav-logout-btn">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

