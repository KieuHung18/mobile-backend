import sequelize from "../databases/postgres.database";
import { User } from "./user";
import { Website } from "./website";

export { User, Website };

export function initModels() {
  User.initModel(sequelize);
  Website.initModel(sequelize);

  User.hasOne(Website, {
    as: "website",
    foreignKey: "userId",
  });
  Website.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  return {
    User,
    Website,
  };
}
