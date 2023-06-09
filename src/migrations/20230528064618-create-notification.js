const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Notification", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        field: "title",
      },
      content: {
        type: DataTypes.STRING,
        field: "content",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deletedAt",
      },
      userId: {
        type: DataTypes.UUID,
        field: "userId",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Notification");
  },
};
