import express from "express";
import { showPolls } from "../handlers/poll.js";

const router = express.Router();
router.route("/").get(showPolls); //Show everything

export default router;
