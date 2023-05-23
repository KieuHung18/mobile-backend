const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Artwork", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
      },
      publicId: {
        type: DataTypes.STRING,
        field: "publicId",
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
        field: "like",
      },
      url: {
        type: DataTypes.STRING,
        field: "url",
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
      publish: {
        type: DataTypes.BOOLEAN,
        field: "publish",
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Artwork");
  },
};
