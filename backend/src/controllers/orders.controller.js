const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');

const orderProductController = async (req, res) => {
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
    const { shippingAddress, totalAmount } = req.body;

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

const orderController = async (req, res) => {
    const userId = req.user._id;
    const data = await orderModel.findOne({ user: userId })

    if (!data) {
        return res.json({
            message: "No orders Placed..."
        })
    }

    res.json({ data });

}

const allOrderController = async (req, res) => {
    const data = await cartModel.find();
    if (!data) {
        return res.status(404).json({
            message: "No Orders Palced...."
        })
    }
    res.status(200).json({
        data
    })
}

const updateOrderController = async (req, res) => {
    const  {status}  = req.body;
    const orderId = req.params.id;

        const order = await orderModel.findOneAndUpdate({_id:orderId},{status},{new:true});
        
        if(!order){
            return res.json({
                message:"Order Not found"
            })
        }
        res.json({
            message:"status Updated",
            order
        })
}

module.exports = { orderProductController, orderCartController, orderController, allOrderController, updateOrderController };