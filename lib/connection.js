import mongoose from "mongoose";

const ConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connection Successfull");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectionDB;
