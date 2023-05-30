import express from "express";
import Artwork from "./artwork.api";
import Ideal from "./ideal.api";
import User from "./user.api";
import Follow from "./follow.api";
import Like from "./like.api";

const Gallery = express.Router();
Gallery.use("/artworks", Artwork);
Gallery.use("/ideals", Ideal);
Gallery.use("/users", User);
Gallery.use("/follows", Follow);
Gallery.use("/likes", Like);
export default Gallery;
