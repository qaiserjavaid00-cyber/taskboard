import mongoose from "mongoose";

export async function connectDB() {
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_URI));
        console.log("MongoDB is connected")
        return conn;
    } catch (error) {
        console.log(error)
    }
}

