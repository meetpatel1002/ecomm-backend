const mongoose = require ("mongoose")

const dbConnect = async () =>{
    try {
        let data = await mongoose.connect("mongodb+srv://Meet:M@cluster0.bdrhd77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = dbConnect