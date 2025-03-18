import jwt from "jsonwebtoken";
import { Poll, User } from "../models/index.js";

//API logic for endpoints
//User Registration Function
export async function register(req, res, next) {
  try {
    //User registration
    const user = await User.create(req.body);
    const { id, username } = user;

    //Generates a JWT token
    const token = jwt.sign({ id, username }, process.env.SECRET);

    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    next(err);
  }
}

//Logic Function
export async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username }); //Finds the user in the database
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password); //Checks if password is correctr

    if (valid) {
      //If the password is correct it creates a JWT token (used for auth in future API requests) and returns a response
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
