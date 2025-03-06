require("dotenv").config();
import mongoose from "mongoose";
import { question } from "readline-sync";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require("./models");

const users = [
  { username: "user1", password: "password" },
  { username: "Michael", password: "password" },
];
const polls = [
  {
    question: "Which is the best Javascript framework",
    options: ["Angular", "React", "Vue"],
  },
  {
    question: "Truth or Dare",
    options: ["Truth", "Dare"],
  },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log("DROP ALL USERS");

    await db.Poll.remove();
    console.log("DROP ALL POLLS");

    await Promise.all(
      users.map(async (user) => {
        const data = await db.User.create(user);
        await data.save();
      })
    );
    console.log("CREATED USERS", JSON.stringify(users));

    await Promise.all(
      polls.map(async (poll) => {
        poll.options = poll.options.map((option) => ({ option, voted: 0 }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: "username" });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      })
    );
    console.log("CREATED POLLS", JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();
