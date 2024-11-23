import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL: string = process.env.APP_DB || "mongodb://localhost:27017/";

const connectToDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDB;
