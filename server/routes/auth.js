const router = require("express").Router();
import { getUsers, login, register } from "../handlers";

router.get("/", getUsers); // for development only
router.post("/login", login);
router.post("/register", register);

export default router;
