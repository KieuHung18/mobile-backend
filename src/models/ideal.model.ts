import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";
import { Artwork, ArtworkProps } from "./artwork.model";

export interface IdealProps extends Model {
  id: string;
  name: string;
  description?: string;
  publish: boolean;
  userId: string;

  getArtworks;
  addArtwork;
  removeArtwork;
  hasArtwork;
  countArtworks;
}

export const Ideal = sequelize.define(
  "Ideal",
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
  {
    paranoid: true,
    freezeTableName: true,
  }
);
Artwork.belongsToMany(Ideal, {
  as: "ideals",
  foreignKey: "artworkId",
  otherKey: "idealId",
  through: "ArtworkIdeal",
});
Ideal.belongsToMany(Artwork, {
  as: "artworks",
  foreignKey: "idealId",
  otherKey: "artworkId",
  through: "ArtworkIdeal",
});
