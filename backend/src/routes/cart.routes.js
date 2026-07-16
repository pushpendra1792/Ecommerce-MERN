const express = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const { cartData } = require('../controllers/cart.controller');

router.get('/view-cart', checkToken, cartData);

module.exports = router;