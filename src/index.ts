import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Apis from "./apis/init.api";

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

import dotenv from "dotenv";
dotenv.config();
const test = process.env.TEST;
app.get("/", (req, res) => res.json({ response: "Hello world", test: test }));
app.get("/health", (req, res) => {
  res.send("OK");
});
app.use("/", Apis);

app.listen(port, () => console.log(`App listening on port ${port}!`));
