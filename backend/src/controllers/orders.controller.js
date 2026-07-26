const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');

const orderController = async (req, res) => {
    const productId = req.params.productId;
    const { quantity, price, totalAmount, shippingAddress } = req.body;
    const userId = req.user._id;

    const order = await orderModel.create({
        user: userId,
        item: [
            {
                product: productId,
                quantity: quantity
            }
        ],
        totalAmount: totalAmount,
        shippingAddress: shippingAddress
    })

    res.json({
        message: "Order Placed for 1 product",
        order
    })
}

const orderCartController = async (req, res) => {
    
}

module.exports = { orderController, orderCartController };