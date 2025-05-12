const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

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
module.exports.connectDB = connectDB;
module.exports.User = require("./user");
module.exports.Poll = require("./poll");
