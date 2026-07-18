const express = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const { cartData, addToCartController } = require('../controllers/cart.controller');

router.get('/view-cart', checkToken, cartData);
router.post('/add-to-cart/:productId',checkToken, addToCartController);

module.exports = router;