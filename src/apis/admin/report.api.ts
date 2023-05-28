import express from "express";
import ReportService from "../../services/report.service";
import ArtworkService from "../../services/artwork.service";
import CloudinaryService from "../../services/cloudinary.service";

const Report = express.Router();

Report.get("/", async (req, res, next) => {
  const reportService = new ReportService();
  try {
    const reports = await reportService.list();
    res.json({ response: reports });
  } catch (error) {
    next(error);
  }
});
Report.get("/:id", async (req, res, next) => {
  const reportService = new ReportService();
  try {
    const reports = await reportService.retrive(req.params.id);
    res.json({ response: reports });
  } catch (error) {
    next(error);
  }
});
Report.delete("/:id", async (req, res, next) => {
  const reportService = new ReportService();
  const artworkService = new ArtworkService();
  const cloudinaryService = new CloudinaryService();
  try {
    const report = await reportService.delete(req.params.id);
    if (report) {
      if (req.body.id) {
        await artworkService.delete(req.body.id);
        await cloudinaryService.delete(req.body.publicId);
      }
    }
    res.json({ response: report });
  } catch (error) {
    next(error);
  }
});

export default Report;
