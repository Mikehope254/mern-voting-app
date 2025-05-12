import { set, Promise, connect } from "mongoose";

set("debug", true);
Promise = global.Promise;

const connectDB = async () => {
  try {
    await connect("mongodb://localhost/vote", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
const _connectDB = connectDB;
export { _connectDB as connectDB };
export const User = require("./user").default;
export const Poll = require("./poll").default;
