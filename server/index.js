import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import db from "./models/index.js";
import { notFound, errors } from "./handlers/index.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use(notFound);
app.use(errors);

app.listen(port, console.log(`Server started on ${port}`));
