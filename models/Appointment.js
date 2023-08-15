//CLient model
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      timeSlot: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      videoLink: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      relatedFrom: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      relatedTo: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      appointmentDate: {
        allowNull: true,
        type: DataTypes.DATEONLY,
      },
    },
    { timestamps: true }
  );
  Appointment.associate = function (models) {
    Appointment.belongsTo(models.User, {
      foreignKey: "relatedTo",
      as: "relatedToUser",
    });
    Appointment.belongsTo(models.User, {
      foreignKey: "relatedFrom",
      as: "relatedFromUser",
    });
  };
  return Appointment;
};
