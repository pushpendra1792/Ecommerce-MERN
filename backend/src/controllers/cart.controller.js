const cartModel = require('../models/cart.model');

const viewCartController = async (req, res) => {

    const cart = await cartModel.find({ user: req.user })
        .populate('user',"-password -email -isAdmin")
        .populate('items.product')

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
    const userId = req.user._id;
    const productId = req.params.productId;
    const cart = await cartModel.findOne({ user: userId});

    if(!cart){
        return json.message({
            message:"You don't have a cart. Add items first."
        })
    }

    const productAlreadyExists = cart.items.find((i) => i.product.toString() === productId);
    if(productAlreadyExists){
        if(productAlreadyExists.quantity>1){
            productAlreadyExists.quantity -= 1;
            await cart.save();
            
                    return res.json({
                        message:"Product Quantity Decreased",
                        cart
                    });
        }
        productAlreadyExists.deleteOne();
        await cart.save();
        res.json({
            message:"Product deleted from cart"
        })
    }

    res.json({
        message:"Product not found in cart.."
    })  

}

module.exports = { viewCartController, addToCartController, removeFromCartController }