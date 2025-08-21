# Frontend Deployment Guide

This guide covers deploying the React frontend to various platforms.

## Environment Setup

### 1. Create Environment Variables

Create a `.env` file in the `mobile-shop` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
# For production, use your actual backend API URL:
# REACT_APP_API_URL=https://your-backend-domain.com/api
```

### 2. Build the Application

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Deployment Platforms

### Vercel (Recommended for React)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd mobile-shop
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add `REACT_APP_API_URL` with your backend URL

4. **Automatic Deployments:**
   - Connect your GitHub repository
   - Vercel will automatically deploy on every push

### Netlify

1. **Build and Deploy:**
   ```bash
   npm run build
   ```

2. **Drag and Drop:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `build` folder to deploy

3. **Git Integration:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

4. **Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add `REACT_APP_API_URL`

### GitHub Pages

1. **Add homepage to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add scripts to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## Production Checklist

### Before Deployment

- [ ] Set `REACT_APP_API_URL` to your production backend URL
- [ ] Ensure all hardcoded localhost URLs are replaced
- [ ] Test the build locally: `npm run build && serve -s build`
- [ ] Verify all API calls work with production backend
- [ ] Check that authentication flows work correctly
- [ ] Test admin functionality
- [ ] Verify CORS is properly configured on backend

### Environment Variables

**Required:**
- `REACT_APP_API_URL` - Your backend API URL

**Optional:**
- `REACT_APP_ENV` - Environment name (development/production)

### Common Issues

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend domain
   - Check that `FRONTEND_URL` is set correctly in backend

2. **API Connection Issues:**
   - Verify `REACT_APP_API_URL` is correct
   - Check that backend is running and accessible
   - Ensure HTTPS is used for production

3. **Build Failures:**
   - Check for any hardcoded localhost URLs
   - Verify all imports are correct
   - Check for any console errors

### Performance Optimization

1. **Code Splitting:**
   - Use React.lazy() for route-based code splitting
   - Implement dynamic imports for large components

2. **Image Optimization:**
   - Use WebP format where possible
   - Implement lazy loading for images
   - Optimize image sizes

3. **Bundle Analysis:**
   ```bash
   npm install --save-dev source-map-explorer
   npm run build
   npx source-map-explorer 'build/static/js/*.js'
   ```

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use `REACT_APP_` prefix for client-side variables
   - Keep sensitive data on the backend

2. **API Security:**
   - Use HTTPS in production
   - Implement proper authentication
   - Validate all user inputs

3. **Content Security Policy:**
   - Consider adding CSP headers
   - Restrict external resource loading

## Monitoring and Analytics

1. **Error Tracking:**
   - Implement error boundaries
   - Use services like Sentry for error monitoring

2. **Performance Monitoring:**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals

3. **User Analytics:**
   - Implement Google Analytics or similar
   - Track user interactions and conversions

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Support

For deployment issues:
1. Check the platform's documentation
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Ensure backend is accessible from frontend domain 