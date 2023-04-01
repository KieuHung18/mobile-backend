const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Website", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      backgroundUrl: {
        type: DataTypes.STRING,
        field: "backgroundUrl",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "userId",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Website");
  },
};
