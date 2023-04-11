import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Apis from "./apis/init.api";
import { logError, returnError } from "./middlewares/error-handling.middleware";
import NotFoundError from "./errors/not-found.error";

const port = process.env.PORT || 3001;
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

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
