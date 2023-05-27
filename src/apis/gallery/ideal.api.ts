import express from "express";
import IdealService from "../../services/ideal.service";

const Ideal = express.Router();
const idealService = new IdealService();

Ideal.get("/", async (req, res, next) => {
  try {
    const artworks = await idealService.publishList();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

export default Ideal;
