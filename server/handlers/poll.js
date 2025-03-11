import { Poll } from "../models/index.js";

export async function showPolls(req, res, next) {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
