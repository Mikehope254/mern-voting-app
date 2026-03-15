import express from "express";
import { getUsers, login, register } from "../handlers/index.js";

const router = express.Router();

router.get("/", getUsers); // for development only
router.post("/login", login);
router.post("/register", register);

export default router;
