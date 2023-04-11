const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        type: DataTypes.INTEGER,
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
      middleName: {
        type: DataTypes.STRING(20),
        field: "middleName",
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
        unique: true,
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
        type: DataTypes.STRING(800),
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
      address: {
        type: DataTypes.STRING,
        field: "address",
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
