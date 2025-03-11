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

export async function createPoll(req, res, next) {
  try {
    const { question, options } = req.body;
    const poll = await Poll.create({
      question,
      options: options.map((option) => ({ option, votes: 0 })),
    });

    res.status(201).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
