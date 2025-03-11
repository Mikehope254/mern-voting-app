import express from "express";
import { showPolls, createPoll } from "../handlers/poll.js";

const router = express.Router();
router.route("/").get(showPolls).post(createPoll); //Show everything

export default router;
