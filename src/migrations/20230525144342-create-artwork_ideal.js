const DataTypes = require("sequelize").DataTypes;
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("ArtworkIdeal", {
      artworkId: {
        type: DataTypes.UUID,
        field: "artworkId",
        primaryKey: true,
      },
      idealId: {
        type: DataTypes.UUID,
        field: "idealId",
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ArtIdeal");
  },
};
