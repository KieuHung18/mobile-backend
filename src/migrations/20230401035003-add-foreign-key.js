const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Website", {
      fields: ["userId"],
      type: "foreign key",
      name: "Website_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Website", "Website_userId_fkey");
  },
};
