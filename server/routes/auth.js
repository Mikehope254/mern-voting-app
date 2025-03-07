import express from "express";
import { register, login } from "../handlers/auth.js";

const router = express.Router();

//API endpoints
router.post("/register", register);
router.post("/login", login);

export default router;
