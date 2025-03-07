import db from "../models/index.js";

const { User, Poll } = db;

export async function register(req, res, next) {
  try {
    const user = await db.User.create(req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}
