import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/vote")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;

module.exports.User = require("./user");
module.exports.Poll = require("./poll");
