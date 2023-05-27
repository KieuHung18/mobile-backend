const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("User", {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
        default: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(10),
        field: "firstName",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(10),
        field: "lastName",
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(10),
        field: "role",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
        unique: true,
      },
      hashPassword: {
        type: DataTypes.STRING,
        field: "hashPassword",
        allowNull: false,
      },
      profileUrl: {
        type: DataTypes.STRING,
        field: "profileUrl",
      },
      publicId: {
        type: DataTypes.STRING,
        field: "publicId",
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
  down: async (queryInterface) => {
    await queryInterface.dropTable("User");
  },
};
