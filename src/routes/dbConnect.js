const mongoose = require ("mongoose")

const dbConnect = async () =>{
    try {
        let data = await mongoose.connect("mongodb+srv://Meet:M@ecommerce.bepa4jm.mongodb.net/")
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = dbConnect