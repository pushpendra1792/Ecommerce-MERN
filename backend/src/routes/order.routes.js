const express = require('express');
const router = express.Router();
const { checkToken, checkAdmin } = require('../middlewares/auth.middleware');
const { orderProductController, orderCartController, orderController, allOrderController, updateOrderController } = require('../controllers/orders.controller');

router.post('/single/:productId', checkToken, orderProductController);
router.post('/order-cart', checkToken, orderCartController);
router.get('/my-orders', checkToken, orderController);
router.get('/orders/all', checkToken, checkAdmin, allOrderController);
router.put('/update-order/:id', checkToken, checkAdmin, updateOrderController);


module.exports = router;