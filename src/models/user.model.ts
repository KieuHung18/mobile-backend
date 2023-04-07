import { DataTypes } from "sequelize";
import sequelize from "../databases/postgres.database";

export interface UserProps {
  id: number;
  firstName: string;
  midleName: string | null;
  lastName: string;
  email: string;
  hashPassword: string;
  title: string | null;
  intro: string | null;
  description: string | null;
  aboutMe: string | null;
  phone: number | null;
  address: string | null;
  profileUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    midleName: {
      type: DataTypes.STRING(20),
    },
    lastName: {
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
    title: {
      type: DataTypes.STRING(45),
    },
    intro: {
      type: DataTypes.STRING(20),
    },
    description: {
      type: DataTypes.STRING(800),
    },
    aboutMe: {
      type: DataTypes.STRING(45),
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    profileUrl: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
