import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";
import { Artwork } from "./artwork.model";
import { Ideal } from "./ideal.model";
import { Report } from "./report.model";
import { Notification } from "./notification";
import { Following } from "./following.model";
import { Like } from "./like.model";

export interface UserProps extends Model {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  hashPassword: string;
  profileUrl?: string;
  publicId?: string;
  createdAt: Date;
  updatedAt: Date;

  getArtworks;
  hasArtwork;
  countArtworks;
  createArtwork;

  getIdeals;
  hasIdeal;
  createIdeal;

  createReport;

  createNotification;
  getNotifications;

  createLike;
  removeLike;
  hasLike;

  createFollowing;
  countFollowings;
  getFollowings;
}

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileUrl: {
      type: DataTypes.STRING,
    },
    publicId: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);

User.hasMany(Artwork, {
  as: "artworks",
  foreignKey: "userId",
});
Artwork.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
User.hasMany(Ideal, {
  as: "ideals",
  foreignKey: "userId",
});
Ideal.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
User.hasMany(Report, {
  as: "reports",
  foreignKey: "userId",
});
Report.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
User.hasMany(Notification, {
  as: "notifications",
  foreignKey: "userId",
});
Notification.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
User.hasMany(Like, {
  as: "likes",
  foreignKey: "userId",
});
Like.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

User.hasMany(Following, {
  as: "followings",
  foreignKey: "userId",
});
Following.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
