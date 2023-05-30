import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";
import Ideal from "./ideal.api";
import Report from "./report.api";
import Notification from "./notification.api";
import Like from "./like.api";
import Follow from "./follow.api";

const Client = express.Router();
Client.use("/", User);
Client.use("/artworks", Artwork);
Client.use("/ideals", Ideal);
Client.use("/reports", Report);
Client.use("/notifications", Notification);
Client.use("/likes", Like);
Client.use("/follows", Follow);
export default Client;
