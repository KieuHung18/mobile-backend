import express from "express";
import Artwork from "./artwork.api";
import Ideal from "./ideal.api";

const Gallery = express.Router();
Gallery.use("/artworks", Artwork);
Gallery.use("/ideals", Ideal);
export default Gallery;
