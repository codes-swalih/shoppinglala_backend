'use strict';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://shoppinglala-frontend.vercel.app',
  'https://www.shoppinglala.in',
  'https://shoppinglala.netlify.app'
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // modern replacement for body-parser

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of hanging
    socketTimeoutMS: 45000,          // Close sockets after 45s inactivity
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// Optional: Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});
mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
});

// Routes
const routes = {
  home: require('./routes/home'),
  auth: require('./routes/auth'),
  brand: require('./routes/brand'),
  category: require('./routes/category'),
  subcategory: require('./routes/subcategory'),
  newsletter: require('./routes/newsletter'),
  product: require('./routes/product'),
  dashboard: require('./routes/dashboard'),
  search: require('./routes/search'),
  user: require('./routes/user'),
  cart: require('./routes/cart'),
  coupon: require('./routes/coupon-code'),
  productReview: require('./routes/product-review'),
  review: require('./routes/review'),
  wishlist: require('./routes/wishlist'),
  order: require('./routes/order'),
  paymentIntent: require('./routes/payment-intents'),
  fileDelete: require('./routes/file-delete'),
  shop: require('./routes/shop'),
  payment: require('./routes/payment'),
  currency: require('./routes/currencies'),
  campaign: require('./routes/compaign'),
};

// Register Routes
app.use('/api', routes.home);
app.use('/api', routes.auth);
app.use('/api', routes.brand);
app.use('/api', routes.category);
app.use('/api', routes.subcategory);
app.use('/api', routes.newsletter);
app.use('/api', routes.product);
app.use('/api', routes.dashboard);
app.use('/api', routes.search);
app.use('/api', routes.user);
app.use('/api', routes.cart);
app.use('/api', routes.coupon);
app.use('/api', routes.productReview);
app.use('/api', routes.review);
app.use('/api', routes.wishlist);
app.use('/api', routes.order);
app.use('/api', routes.paymentIntent);
app.use('/api', routes.fileDelete);
app.use('/api', routes.shop);
app.use('/api', routes.payment);
app.use('/api', routes.currency);
app.use('/api', routes.campaign);

// Add this to your Express app setup
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Root route
app.get('/', (req, res) => {
  res.send('🟢 Backend API is running! swalih cum shot shuklam');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port   ${PORT}`);
});
