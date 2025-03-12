import { Poll, User } from "../models/index.js";

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
    console.log(req.decoded);
    const { id } = req.decoded;
    const user = await User.findById(id);

    const { question, options } = req.body;
    const poll = await Poll.create({
      question,
      user,
      options: options.map((option) => ({ option, votes: 0 })),
    });
    user.polls.push(poll._id);
    await user.save();

    res.status(201).json({ ...poll._doc, user: user._id });
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
