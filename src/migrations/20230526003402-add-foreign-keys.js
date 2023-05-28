module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint("Report", {
      fields: ["userId"],
      type: "foreign key",
      name: "Report_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });

    await queryInterface.addConstraint("Report", {
      fields: ["artworkId"],
      type: "foreign key",
      name: "Report_artworkId_fkey",
      references: {
        table: "Artwork",
        field: "id",
      },
    });

    await queryInterface.addConstraint("Artwork", {
      fields: ["userId"],
      type: "foreign key",
      name: "Artwork_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });

    await queryInterface.addConstraint("Ideal", {
      fields: ["userId"],
      type: "foreign key",
      name: "Ideal_userId_fkey",
      references: {
        table: "User",
        field: "id",
      },
    });

    await queryInterface.addConstraint("ArtworkIdeal", {
      fields: ["artworkId"],
      type: "foreign key",
      name: "ArtworkIdeal_artworkId_fkey",
      references: {
        table: "Artwork",
        field: "id",
      },
    });

    await queryInterface.addConstraint("ArtworkIdeal", {
      fields: ["idealId"],
      type: "foreign key",
      name: "ArtworkIdeal_idealId_fkey",
      references: {
        table: "Ideal",
        field: "id",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeConstraint("Artwork", "Artwork_userId_fkey");
    await queryInterface.removeConstraint("Ideal", "Ideal_userId_fkey");
    await queryInterface.removeConstraint("ArtIdeal", "ArtIdeal_idealId_fkey");
    await queryInterface.removeConstraint("ArtIdeal", "ArtIdeal_idealId_fkey");
    await queryInterface.removeConstraint(
      "IdealArt",
      "IdealArt_artworkId_fkey"
    );
    await queryInterface.removeConstraint(
      "IdealArt",
      "IdealArt_artworkId_fkey"
    );
  },
};
