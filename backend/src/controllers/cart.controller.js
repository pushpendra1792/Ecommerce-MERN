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

const addToCartController = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId});

    if (!cart) {
        const newCart = await cartModel.create({
            user: userId,
            items: [
                {
                    product:productId,
                    quantity:1
                }
            ]
        })
        return res.json({
            message: "Cart Created and Product added to cart",
            newCart
        })
    }

    const productAlreadyExists = cart.items.find((i) => i.product.toString() === productId);
    
    if(productAlreadyExists){
        productAlreadyExists.quantity += 1;
        await cart.save();

        return res.json({
            message:"Product Quantity Updated",
            cart
        });
    }
    
    cart.items.push({product:productId, quantity:1});
    await cart.save();

    res.json({
        message: "Product added to cart successfully",
        cart
    })
}

const removeFromCartController = async (req, res) => {
    const user = req.user;
}

module.exports = { cartData, addToCartController, removeFromCartController }