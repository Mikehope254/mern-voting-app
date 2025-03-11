import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { connectDB } from "./models/index.js";
import { notFound, errors } from "./handlers/index.js";
import { auth, poll } from "./routes/index.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

//API Main entry point
app.use("/api/auth", auth);
app.use("/api/polls", poll);

app.use(notFound);
app.use(errors);

connectDB().then(() => {
  app.listen(port, () => console.log(`Server started on ${port}`));
});
