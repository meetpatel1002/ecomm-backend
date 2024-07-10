const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },

    totalPrice: {
        type: Number
    },
    userId: {
        type: String
    },
    id:{
        type:String
    }
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;