const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(10),
        field: "firstName",
        allowNull: false,
      },
      midleName: {
        type: DataTypes.STRING(20),
        field: "midleName",
      },
      lastName: {
        type: DataTypes.STRING(10),
        field: "lastName",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
      },
      hashPassword: {
        type: DataTypes.STRING,
        field: "hashPassword",
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(45),
        field: "title",
      },
      intro: {
        type: DataTypes.STRING(20),
        field: "intro",
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
      },
      aboutMe: {
        type: DataTypes.STRING(45),
        field: "aboutMe",
      },
      phone: {
        type: DataTypes.INTEGER,
        field: "phone",
      },
      profileUrl: {
        type: DataTypes.STRING,
        field: "profileUrl",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  },
};
