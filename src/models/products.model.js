const mongoose = require ('mongoose');

const productsSchema = new mongoose.Schema({
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
        type:String
    }
},{timeStamp:true})

const Product = mongoose.model("Product", productsSchema)

module.exports = Product