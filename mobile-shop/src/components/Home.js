import './Home.css'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/api'
import { SearchContext } from '../context/SearchContext'

const Home = () => {
  const [products, setProducts] = useState([])
  const { searchTerm } = useContext(SearchContext)

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error loading products:', err))
  }, [])

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.category.toLowerCase().includes(searchTerm.toLowerCase())
)


  const isSearching = searchTerm.trim() !== ''

  const toAbsolute = (url) => {
    if (!url) return ''
    if (/^https?:\/\//i.test(url)) return url
    const base = (API.defaults.baseURL || '').replace(/\/api$/,'')
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`
  }

  const getImageSrc = (p) => {
    const candidate = p.image || p.imageUrl || p.imageURL || p.img || (Array.isArray(p.images) && p.images.length ? p.images[0] : '')
    const abs = toAbsolute(candidate)
    return abs || 'https://via.placeholder.com/400x300?text=No+Image'
  }

  return (
    <div className="home-container">
      {/* 🔍 Hide banner and category if searching */}
      {!isSearching && (
        <>
          <section className="banner-container my-5">
            <p className='banner-name-1'>Explore and Discover the best in Dialzo</p>
            <p className='banner-name-2'>Your complete destination for phones and accessories</p>
          </section>

          <section className="category-container ">
            <h3 className=" mb-4 text-center">Top Categories</h3>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              {categories.map((cat, index) => (
                <Link key={index} to={`/products?category=${cat}`} className="btn btn-outline-dark">
                  {cat}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="latest-products container my-5">
        <h3 className="mb-4 text-center">
          {isSearching ? `Search Results for "${searchTerm}"` : 'Latest Products'}
        </h3>
        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="row">
            {filteredProducts.slice(0, 18).map(product => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={getImageSrc(product)} className="card-img-top" alt={product.name} referrerPolicy="no-referrer" crossOrigin="anonymous" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">₹{product.price}</p>
                    <p className="text-muted">{product.category}</p>
                    <Link to={`/products?category=${product.category}`} className="btn btn-dark">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
