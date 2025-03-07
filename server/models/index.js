import mongoose from "mongoose";
import User from "./user.js";
import Poll from "./polls.js";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/vote");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export { connectDB, User, Poll };

export default { connectDB, User, Poll };
