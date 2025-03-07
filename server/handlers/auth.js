import db from "../models/index.js";

const { User, Poll } = db;

//API logic for endpoint
export async function register(req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    res.json({ id, username });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      res.json({ id, username });
    } else {
      throw new Error("Invalid Username/Password");
    }
  } catch (err) {
    next(err);
  }
}
