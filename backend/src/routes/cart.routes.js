const express = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const router = express.Router();
const { viewCartController, addToCartController, removeFromCartController } = require('../controllers/cart.controller');

router.get('/view-cart', checkToken, viewCartController);
router.post('/add-to-cart/:productId',checkToken, addToCartController);
router.post('/remove-from-cart/:productId',checkToken, removeFromCartController);

module.exports = router;