const cartModel = require('../models/cart.model');

const cartData = async (req, res) => {

    const cart = await cartModel.find({ user: req.user })
        .populate('user')
        .populate('items.product')
        .populate('items.quantity');
        
    res.json({
        message: "cart Fetched",
        cart
    })
}

const addToCart = async (req, res) => {


}

const removeFromCart = async (req, res) => {
    const user = req.user;
}

module.exports = { cartData }