import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb server!");
  } catch (error) {
    console.log("error connecting database!", error);
  }
};

export { connectDB };
