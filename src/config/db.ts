import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/faqDB";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "faqDB",
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;
