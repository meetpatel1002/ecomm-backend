const mongoose = require ('mongoose');

const sellerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timeStamp:true})

const Seller = mongoose.model("Seller", sellerSchema)

module.exports = Seller