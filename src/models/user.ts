import {
  Association,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import type { Website } from "./website";

type UserAssociations = "website";

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare midleName: string | null;
  declare lastName: string;
  declare email: string;
  declare hashPassword: string;
  declare title: string | null;
  declare intro: string | null;
  declare description: string | null;
  declare aboutMe: string | null;
  declare phone: number | null;
  declare profileUrl: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // User hasOne Website
  declare website?: NonAttribute<Website>;
  declare getWebsite: HasOneGetAssociationMixin<Website>;
  declare setWebsite: HasOneSetAssociationMixin<Website, number>;
  declare createWebsite: HasOneCreateAssociationMixin<Website>;

  declare static associations: {
    website: Association<User, Website>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
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
          type: DataTypes.STRING,
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
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );

    return User;
  }
}
