import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Apis from "./apis/init.api";
import { logError, returnError } from "./middlewares/error-handling.middleware";
import NotFoundError from "./errors/not-found.error";

const port = process.env.PORT || 3001;
const app = express();
const whitelist = [
  "http://localhost:8000",
  "http://localhost:3000",
  "https://kieuhung18.github.io",
];
const corsOptions = {
  credentials: true,
  origin: whitelist,
  optionsSuccessStatus: 200,
};

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/", Apis);
app.all("*", () => {
  throw new NotFoundError("ApiNotFoundError", "Api not found, missing route");
});

app.use(logError);
app.use(returnError);

app.listen(port, () => console.log(`App listening on port ${port}!`));
