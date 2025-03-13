import { Poll, User } from "../models/index.js";

export async function showPolls(req, res, next) {
  try {
    const polls = await Poll.find().populate("user", ["username", "id"]);
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

export async function usersPolls(req, res, next) {
  try {
    const { id } = req.decoded;

    const user = await User.findById(id).populate("polls");

    res.status(200).json(user.polls);
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

export async function getPoll(req, res, next) {
  try {
    const { id } = req.params;

    const poll = await Poll.findById(id).populate("user", ["username", "id"]);

    if (!poll) throw new Error("No poll found");

    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
  }
}

export async function deletePoll(req, res, next) {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;

    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("No poll found");

    if (poll.user.toString() !== userId) {
      throw new Error("Unauthorized access");
    }

    await poll.deleteOne();
    res.status(202).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

export async function vote(req, res, next) {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;
    const { answer } = req.body;

    if (answer) {
      const poll = await Poll.findById(pollId);
      if (!poll) throw new Error("No poll found");

      const vote = poll.options.map((option) => {
        if (option.option === answer) {
          return {
            option: option.option,
            _id: option._id,
            votes: option.votes + 1,
          };
        } else {
          return option;
        }
      });

      if (poll.voted.filter((user) => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();
        res.status(202).json(poll);
      } else {
        throw new Error("Already Voted");
      }
    } else {
      throw new Error("No asnwer provided");
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
