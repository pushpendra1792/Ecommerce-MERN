const cartModel = require('../models/cart.model');

const cartData = async (req, res) => {
    const cart = await cartModel.find();
    res.json({
        message: "cart Fetched",
        cart
    })
}

const addToCart = async (req, res) => {
    const user = req.user;
}

const removeFromCart = async (req, res) => {
    const user = req.user;
}

module.exports = { cartData }