import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = process.env.MONGODB;

export const connectToDb = async () => {
  try {
    await mongoose.connect(baseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
