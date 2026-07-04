import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose connection disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Mongoose connection closed due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
