import { ArtworkProps } from "../models/artwork.model";
import { NotificationProps } from "../models/notification";
import { ReportProps } from "../models/report.model";
import { UserProps } from "../models/user.model";

class NotificationService {
  public async sendReportNotification(
    user: UserProps,
    report: ReportProps,
    artwork: ArtworkProps
  ): Promise<NotificationProps> {
    const content =
      "Your artwork " +
      artwork.name +
      "violated " +
      report.name +
      " policy, because " +
      report.description;
    const notification = { title: ARTWORK_DELETE_NOTIFICATION, content };
    return await user.createNotification(notification);
  }
}
import { ARTWORK_DELETE_NOTIFICATION } from "./constant";
export default NotificationService;
