const mongoose = require('mongoose');
const userModel = require('./user.model');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount:{
        type:Number,
        // required:true
    },

    status:{
        type:String
    },

    shippingAddress:{
        type:String,
        // required:true
    }

});

const orderModel = mongoose.model('orders',orderSchema);

module.exports = orderModel;