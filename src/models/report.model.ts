import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";
import { Artwork } from "./artwork.model";

export interface ReportProps extends Model {
  id: string;
  name: string;
  description?: string;
  solved: boolean;
  userId: string;
  artworkId: string;

  getArtwork;
  setArtwork;
}

export const Report = sequelize.define(
  "Report",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    solved: {
      type: DataTypes.BOOLEAN,
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
Report.belongsTo(Artwork, {
  as: "artwork",
  foreignKey: "artworkId",
});
Artwork.hasOne(Report, {
  as: "report",
  foreignKey: "artworkId",
});
