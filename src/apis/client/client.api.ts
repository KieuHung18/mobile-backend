import express from "express";
import User from "./user.api";

const Client = express.Router();
Client.use("/user", User);
export default Client;
