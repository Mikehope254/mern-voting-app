import mongoose from "mongoose";

mongoose.set("debug", true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/vote", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

import User from "./user.js";
import Poll from "./poll.js";

export { connectDB, User, Poll };
