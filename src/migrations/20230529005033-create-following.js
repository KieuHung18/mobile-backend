const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Following", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
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
        type: DataTypes.UUID,
        field: "userId",
      },
      followingId: {
        type: DataTypes.UUID,
        field: "followingId",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Following");
  },
};
