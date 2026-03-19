import mongoose from "mongoose";

let connectionError = null;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    connectionError = null;
  } catch (error) {
    console.log("MongoDB connection error details:", error);
    connectionError = error.message;
  }
};

export { connectionError };
