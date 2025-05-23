import { User } from "../models";
import { sign } from "jsonwebtoken";

// for development only
export async function getUsers(req, res, next) {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function register(req, res, next) {
  try {
    console.log("Registration attempt:", req.body); //Log the registration data
    const user = await User.create(req.body);
    const { id, username } = user;
    const token = sign({ id, username }, process.env.SECRET);

    return res.status(201).json({
      id,
      username,
      token,
    });
  } catch (err) {
    console.error("Registration error:", err); //Log the full error
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function login(req, res, next) {
  try {
    console.log("Login attempt:", req.body.username); //Log the login attempt
    const user = await User.findOne({
      username: req.body.username,
    }).select("+password"); //This includes the password field

    if (!user) {
      throw new Error("Invalid Username/Password");
    }

    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = sign({ id, username }, process.env.SECRET);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      throw new Error("Invalid Username/Password");
    }
  } catch (err) {
    console.error("Login error:", err); //Log the full error
    return next({ status: 400, message: "Invalid Username/Password" });
  }
}
