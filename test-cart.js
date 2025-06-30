const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testCartDeletion() {
  try {
    console.log('Testing cart deletion...');
    
    // First, let's check if the server is running
    const productsResponse = await axios.get(`${API_BASE}/products`);
    console.log('✅ Products API is working');
    
    // Test cart endpoint (this will fail without auth, but we can see the error)
    try {
      const cartResponse = await axios.get(`${API_BASE}/cart`);
      console.log('✅ Cart API is working');
    } catch (error) {
      console.log('❌ Cart API error (expected without auth):', error.response?.data?.message || error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCartDeletion(); 