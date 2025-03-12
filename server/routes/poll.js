import express from "express";
import { showPolls, createPoll } from "../handlers/poll.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(showPolls); //Show everything
router.route("/").post(authMiddleware, createPoll);

export default router;
