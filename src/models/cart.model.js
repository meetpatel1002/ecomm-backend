const mongoose = require ('mongoose');

const cartSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },

    category:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    productId:{
        type:String,
    },
    quantity:{
        type:Number,
    },
    userId:{
        type:String
    }
},{timeStamp:true})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart