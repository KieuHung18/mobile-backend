import NotFoundError from "../errors/not-found.error";
import { Artwork } from "../models/artwork.model";
import { Report, ReportProps } from "../models/report.model";
import { User } from "../models/user.model";
class ReportService {
  public async retrive(id: string): Promise<ReportProps> {
    const report = await Report.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: Artwork, as: "artwork" },
      ],
    });
    if (report) {
      return report as ReportProps;
    } else {
      throw new NotFoundError("ReportQueryError", "Report not found");
    }
  }
  public async delete(id: string): Promise<ReportProps> {
    const report = await this.retrive(id);
    await report.destroy();
    return report;
  }
  public async list(): Promise<ReportProps[]> {
    return (await Report.findAll({
      include: [
        { model: User, as: "user" },
        { model: Artwork, as: "artwork" },
      ],

      order: [["createdAt", "DESC"]],
    })) as ReportProps[];
  }
}
export default ReportService;
