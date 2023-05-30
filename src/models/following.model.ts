import { DataTypes, Model } from "sequelize";
import sequelize from "../databases/postgres.database";

export interface FollowingProps extends Model {
  id: string;
  userId: string;
  followingId: string;
}

export const Following = sequelize.define(
  "Following",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.STRING,
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
