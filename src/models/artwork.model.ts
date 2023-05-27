import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";

export interface ArtworkProps extends Model {
  id: string;
  url: string;
  publicId: string;
  name?: string;
  description?: string;
  publish: boolean;
}

export const Artwork = sequelize.define(
  "Artwork",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    publish: {
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
  { paranoid: true, freezeTableName: true }
);
