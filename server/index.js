require("dotenv").config();
import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { notFound, errors } from "./handlers";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use(notFound);
app.use(errors);

app.listen(port, console.log(`Server started on ${port}`));
