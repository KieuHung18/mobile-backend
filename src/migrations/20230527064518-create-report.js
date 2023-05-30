const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Report", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
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
      artworkId: {
        type: DataTypes.UUID,
        field: "artworkId",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Report");
  },
};
