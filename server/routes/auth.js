import express from "express";
// import { register, login } from "../handlers/auth.js";

import { authHandlers } from "../handlers/index.js";
const { register, login } = authHandlers;

const router = express.Router();

//API endpoints
router.post("/register", register);
router.post("/login", login);

export default router;
