# Mobile Shop Backend API

A Node.js/Express backend for the mobile shop application with MongoDB database.

## Features

- User authentication with JWT
- Product management (CRUD operations)
- Shopping cart functionality
- Order management
- Admin panel for order management
- Secure API endpoints with middleware

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/your-database-name
# For production, use MongoDB Atlas or similar:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
# Generate a strong secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Server Configuration
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
# For production, use your actual frontend domain:
# FRONTEND_URL=https://your-frontend-domain.com

# Environment
NODE_ENV=development
# For production:
# NODE_ENV=production
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `GET /api/orders/my-orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status (Admin only)

### Admin Orders
- `GET /api/admin/orders` - Get all orders (Admin only)

## Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Render
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## Security Features

- JWT authentication for protected routes
- Password hashing with bcrypt
- CORS configuration for frontend security
- Environment variables for sensitive data
- Input validation and sanitization

## Database Schema

### User
- name, email, password, role (user/admin)

### Product
- name, price, image, category, description

### Cart
- userId, items (array of product references with quantity)

### Order
- userId, items, total, status, createdAt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC 