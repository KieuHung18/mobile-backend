"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Like", {
      fields: ["userId"],
      type: "foreign key",
      name: "Like_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });

    await queryInterface.addConstraint("Like", {
      fields: ["artworkId"],
      type: "foreign key",
      name: "Like_artworkId_fkey",
      references: {
        table: "Artwork",
        field: "id",
      },
    });

    await queryInterface.addConstraint("Following", {
      fields: ["userId"],
      type: "foreign key",
      name: "Following_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
