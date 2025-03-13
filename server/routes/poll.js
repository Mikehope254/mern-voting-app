import express from "express";

import {
  showPolls,
  createPoll,
  usersPolls,
  getPoll,
  deletePoll,
  vote,
} from "../handlers/poll.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(showPolls); //Show everything
router.route("/").post(authMiddleware, createPoll);

router.get("/user", authMiddleware, usersPolls);

router
  .route("/:id")
  .get(getPoll)
  .post(authMiddleware, vote)
  .delete(authMiddleware, deletePoll);
export default router;
