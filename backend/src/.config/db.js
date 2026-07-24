const mongoose = require('mongoose');

const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("mongodb connection error  : ", error);
        process.exit(1);
    }
}

module.exports = connectToDb;