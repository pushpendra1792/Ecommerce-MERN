const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/health',healthRoutes);

module.exports = app;