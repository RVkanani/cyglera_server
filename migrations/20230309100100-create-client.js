"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Clients", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      DieticianId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Dieticians",
          key: "id",
        },
      },
      PhysicianId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Physicians",
          key: "id",
        },
      },
      TrainerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Trainers",
          key: "id",
        },
      },
      CareProviderId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "CareProviders",
          key: "id",
        },
      },
      height: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      weight: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      waistCircumference: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      hipCircumference: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      BMI: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      goals: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      dailyActivityLevel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      languages: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      occupation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dietHabits: {
        allowNull: false,
        type: Sequelize.JSON,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Clients");
  },
};
