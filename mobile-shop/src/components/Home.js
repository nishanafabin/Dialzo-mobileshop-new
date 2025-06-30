import './Home.css'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SearchContext } from '../context/SearchContext'

const Home = () => {
  const [products, setProducts] = useState([])
  const { searchTerm } = useContext(SearchContext)

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error loading products:', err))
  }, [])

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.category.toLowerCase().includes(searchTerm.toLowerCase())
)


  const isSearching = searchTerm.trim() !== ''

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
                  <img src={product.image} className="card-img-top" alt={product.name} />
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
