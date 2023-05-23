import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";

const Client = express.Router();
Client.use("/", User);
Client.use("/artworks", Artwork);
export default Client;
