const router = require("express").Router();
import {
  showPolls,
  createPoll,
  usersPolls,
  getPoll,
  vote,
  deletePoll,
} from "../handlers";
import auth from "../middleware/auth";

router.route("/").get(showPolls).post(auth, createPoll);

router.get("/user", auth, usersPolls);

router.route("/:id").get(getPoll).post(auth, vote).delete(auth, deletePoll);

export default router;
