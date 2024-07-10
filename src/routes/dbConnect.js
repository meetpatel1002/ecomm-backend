const mongoose = require ("mongoose")

const dbConnect = async () =>{
    try {
        let data = await mongoose.connect("mongodb://localhost:27017/angularEcom")
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = dbConnect