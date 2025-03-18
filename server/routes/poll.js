import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { pollHandlers } from "../handlers/index.js";

const { createPoll, showPolls, usersPolls, getPoll, deletePoll, vote } =
  pollHandlers;

const router = express.Router();
router.route("/").get(showPolls); //Show everything

//before creating/deleting a poll authMiddleware ensures the user is authenticated
router.route("/").post(authMiddleware, createPoll);
router.get("/user", authMiddleware, usersPolls);

router
  .route("/:id")
  .get(getPoll)
  .post(authMiddleware, vote)
  .delete(authMiddleware, deletePoll);

export default router;
