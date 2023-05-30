import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";

export interface LikeProps extends Model {
  id: string;
  userId: string;
  artworkId: string;
}

export const Like = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);
