import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";
import Ideal from "./ideal.api";
import Report from "./report.api";

const Client = express.Router();
Client.use("/", User);
Client.use("/artworks", Artwork);
Client.use("/ideals", Ideal);
Client.use("/reports", Report);
export default Client;
