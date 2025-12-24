import mongoose from "mongoose";
import {ApiError, log} from "../utils/utils.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_CONNECTION_URL}`);
        log.info(
            `MongoDB connected | HOST: ${connectionInstance.connection.host}`
          );
    } catch (error) {
        log.error("MongoDB connection failed", error);
        throw new ApiError(
            500,
            "Failed to connect to database",
            [{ message: error.message }]
          );
    }
}

export default connectDb;