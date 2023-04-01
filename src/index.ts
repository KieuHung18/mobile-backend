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

app.get("/", (req, res) => res.json({ msg: "Hello world" }));
app.get("/health", (req, res) => {
  res.send("OK");
});
app.use("/", Apis);

app.listen(port, () => console.log(`App listening on port ${port}!`));
