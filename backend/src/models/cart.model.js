const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products',
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
})

const cartModel = mongoose.model('cart',cartSchema);

module.exports = cartModel;