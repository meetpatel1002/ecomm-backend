const mongoose = require ("mongoose")

const dbConnect = async () =>{
    try {
        let data = await mongoose.connect("mongodb+srv://MEET:M@cluster0.sycpeol.mongodb.net/")
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = dbConnect