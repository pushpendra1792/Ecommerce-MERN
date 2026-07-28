const express = require('express');
const router = express.Router();
const { checkToken, checkAdmin } = require('../middlewares/auth.middleware');
const { orderController, orderCartController } = require('../controllers/orders.controller');

router.post('/single/:productId', checkToken, orderController);
router.post('/order-cart', checkToken, orderCartController);

// Orders routes (quick)


// GET /orders/my — user's own orders
// GET /orders/all — admin sees all orders
// PUT /orders/:id — admin updates order status

module.exports = router;