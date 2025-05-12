require("dotenv").config();

import express, { json, urlencoded } from "express";
import cors from "cors";
import { connectDB } from "./models/index";

import { auth, poll } from "./routes";
import { error } from "./handlers";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/polls", poll);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(error);

connectDB();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
