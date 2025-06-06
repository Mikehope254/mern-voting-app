import { Poll, User } from "../models";

export async function showPolls(req, res, next) {
  try {
    const polls = await Poll.find().populate("user", ["username", "id"]);
    // .populate('voted', ['username', 'id']);

    return res.status(200).json(polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function usersPolls(req, res, next) {
  const { id } = req.decoded;
  try {
    const user = await User.findById(id).populate("polls");

    return res.status(200).json(user.polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function createPoll(req, res, next) {
  const { id } = req.decoded;
  const { question, options } = req.body;
  try {
    const user = await User.findById(id);
    const poll = await Poll.create({
      question,
      user,
      options: options.map((option) => ({ option, votes: 0 })),
    });
    user.polls.push(poll._id);
    await user.save();

    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function vote(req, res, next) {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  const { answer } = req.body;
  try {
    if (answer) {
      const poll = await Poll.findById(pollId);
      if (!poll) throw new Error("No poll found");

      const vote = poll.options.map((option) =>
        option.option === answer
          ? {
              option: option.option,
              _id: option._id,
              votes: option.votes + 1,
            }
          : option
      );

      console.log("VOTE: USERID ", userId);
      console.log("VOTE: poll.voted ", poll.voted);
      console.log(
        "VOTE: vote filter",
        poll.voted.filter((user) => user.toString() === userId).length
      );

      if (poll.voted.filter((user) => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        return res.status(202).json(poll);
      } else {
        throw new Error("Already voted");
      }
    } else {
      throw new Error("No Answer Provided");
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function getPoll(req, res, next) {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id).populate("user", ["username", "id"]);
    // .populate('voted', ['username', 'id']);
    if (!poll) throw new Error("No poll found");

    return res.status(200).json(poll);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}

export async function deletePoll(req, res, next) {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  try {
    let user = await User.findById(userId);
    if (user.polls) {
      // not sure if necessary either...
      user.polls = user.polls.filter((userPoll) => {
        return userPoll._id.toString() !== pollId.toString(); // not sure if necessary to use toString()
      });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("No poll found");
    if (poll.user.toString() !== userId) {
      throw new Error("Unauthorized access");
    }
    await user.save();
    await poll.remove();
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
}
