const express = require('express');
const router = express.Router();
const { productsController, singleProductController, createProductController, updateProductController, deleteProductController } = require('../controllers/products.controller');
const { checkToken, checkAdmin } = require('../middlewares/auth.middleware');

router.get('/products', productsController);
router.get('/:id', checkToken, singleProductController);
router.post('/create-product', checkToken, checkAdmin, createProductController);
router.put('/update-product/:id', checkToken, checkAdmin, updateProductController);
router.delete('/delete-product/:id', checkToken, checkAdmin, deleteProductController);

module.exports = router;