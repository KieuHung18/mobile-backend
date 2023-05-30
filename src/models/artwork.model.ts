import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";
import { Like } from "./like.model";

export interface ArtworkProps extends Model {
  id: string;
  url: string;
  publicId: string;
  name?: string;
  description?: string;
  publish: boolean;
  userId: string;

  getLikes;
  hasLike;
  countLikes;
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
Artwork.hasMany(Like, {
  as: "likes",
  foreignKey: "artworkId",
});
Like.belongsTo(Artwork, {
  as: "artwork",
  foreignKey: "artworkId",
});
