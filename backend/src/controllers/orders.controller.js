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
    const userId = req.user._id;
    const data = await cartModel.findOne({ user: userId })
    const items = data.items;
    const { shippingAddress, totalAmount} = req.body;

    const order = await orderModel.create({
        user: userId,
        items: items,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress
    })

    res.json({
        order
    })
}

module.exports = { orderController, orderCartController };