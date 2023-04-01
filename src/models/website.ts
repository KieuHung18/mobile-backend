import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import type { User } from "./user";

type WebsiteAssociations = "user";

export class Website extends Model<
  InferAttributes<Website, { omit: WebsiteAssociations }>,
  InferCreationAttributes<Website, { omit: WebsiteAssociations }>
> {
  declare id: CreationOptional<number>;
  declare backgroundUrl: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Website belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare static associations: {
    user: Association<Website, User>;
  };

  static initModel(sequelize: Sequelize): typeof Website {
    Website.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        backgroundUrl: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      { sequelize, freezeTableName: true }
    );

    return Website;
  }
}
