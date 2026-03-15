import express from "express";
import {
  showPolls,
  createPoll,
  usersPolls,
  getPoll,
  vote,
  deletePoll,
} from "../handlers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(showPolls).post(auth, createPoll);

router.get("/user", auth, usersPolls);

router.route("/:id").get(getPoll).post(auth, vote).delete(auth, deletePoll);

export default router;
