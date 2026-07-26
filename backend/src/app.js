const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/product',productRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

module.exports = app;