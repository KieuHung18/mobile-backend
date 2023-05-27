const DataTypes = require("sequelize").DataTypes;
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("Ideal", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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

  async down(queryInterface) {
    await queryInterface.dropTable("Artwork");
  },
};
