import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { notFound, errors } from "./handlers/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use(notFound);
app.use(errors);

app.listen(port, console.log(`Server started on ${port}`));
