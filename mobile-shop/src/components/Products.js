import React, { useEffect, useState, useContext } from 'react';
import API from '../utils/api';
import { useLocation, Link } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();

  const { searchTerm } = useContext(SearchContext);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

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
  };

  useEffect(() => {
    API.get('/products')
      .then((res) => {
        setProducts(res.data);
        const initialQuantities = {};
        res.data.forEach((p) => {
          initialQuantities[p._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  const handleQuantityChange = (productId, action) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]:
        action === 'inc'
          ? prev[productId] + 1
          : Math.max(1, prev[productId] - 1),
    }));
  };

  const handleAddToCart = async (product) => {
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        image: getImageSrc(product),
        price: product.price,
        quantity: quantities[product._id]
      };
      
      await API.post('/cart', cartItem);
      alert('Item added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const searchedProducts = filteredProducts.filter((product) =>
    [product.name, product.category]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <h2 className="products-title">
        {selectedCategory
          ? `${selectedCategory}`
          : 'Browse Our Latest Mobiles'}
      </h2>

      {searchedProducts.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {searchedProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={getImageSrc(product)}
                  alt={product.name}
                  className="product-image"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                />
              </Link>
              <div className="product-info">
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>
                <div className="button-qty-container">
                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() =>
                        handleQuantityChange(product._id, 'dec')
                      }
                    >
                      -
                    </button>
                    <span>{quantities[product._id]}</span>
                    <button
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() =>
                        handleQuantityChange(product._id, 'inc')
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
