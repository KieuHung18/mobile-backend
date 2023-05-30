const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Like", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        default: DataTypes.UUIDV4,
        primaryKey: true,
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
      artworkId: {
        type: DataTypes.UUID,
        field: "artworkId",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Like");
  },
};
