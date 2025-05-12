import { Schema, model } from "mongoose";
import { findById } from "./user";

const optionSchema = new Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],

  voted: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

pollSchema.pre("remove", async function (next) {
  try {
    const user = await findById(this.user);
    user.polls = user.polls.filter(
      (poll) => poll._id.toString() !== this._id.toString()
    );
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

export default model("Poll", pollSchema);
