import jwt from "jsonwebtoken";
import { Poll, User } from "../models/index.js";

//API logic for endpoints
export async function register(req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET);

    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);

      res.json({ id, username, token });
    } else {
      throw new Error("Invalid Username/Password");
    }
  } catch (err) {
    err.message = "Invalid Username/Password";

    next(err);
  }
}
