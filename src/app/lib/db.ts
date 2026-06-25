import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Database connection failed: ${error.message}`);
    throw error; // এররটি থ্রো করলে আমাদের API ক্যাচ ব্লক সেটা ধরতে পারবে
  }
};

export default connectDB;
