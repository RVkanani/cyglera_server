const { encryptPwd } = require("../util/cryptFunc");
const crypto = require("crypto");
const { sequelize } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const models = require("../models");

const User = models.User;
const Dietician = models.Dietician;
const Physician = models.Physician;
const Trainer = models.Trainer;
const CareProvider = models.CareProvider;
const Client = models.Client;
const Appointment = models.Appointment;

exports.editAppointment = async (req, res) => {
  const { videoLink } = req.body;
  const id = req.params.id;
  try {
    const result = await Appointment.update(
      { videoLink: videoLink },
      { where: { id: id } }
    );

    if (result[0] === 0) {
      return res
        .status(404)
        .send({ type: "error", msg: "Appointment not found" });
    }

    return res
      .status(200)
      .send({ type: "success", msg: "Appointment updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ type: "error", msg: "Error updating appointment" });
  }
};

exports.createAppointment = async (req, res) => {
  const {
    values,
    videoLink,
    description,
    relatedFrom,
    relatedTo,
    newSlots,
    roleId,
    tomorrowFormatted,
  } = req.body;
  const userFound = await User.findOne({ where: { id: relatedFrom } });
  try {
    const result = await sequelize.transaction(async (t) => {
      //now save to DB
      const createAppointment = await Appointment.create(
        {
          subject: values.subject,
          timeSlot: values.slot,
          role: values.role,
          description: "",
          relatedFrom,
          relatedTo,
          appointmentDate: tomorrowFormatted,
        },
        { transaction: t }
      );
      if (!createAppointment || createAppointment.length < 1) {
        return res
          .status(401)
          .send({ type: "error", msg: "Couldn't create appointment" });
      }
      if (createAppointment) {
        if (values.userRole == "DIETICIAN") {
          let updatedDietician = await Dietician.update(
            {
              availableSlots: newSlots,
            },
            {
              where: {
                UserId: relatedTo,
              },
            }
          );
          let updatedUser = await Client.update(
            {
              DieticianId: roleId,
              updatedAt: new Date(),
            },
            {
              where: {
                UserId: relatedFrom,
              },
            }
          );
          if (updatedUser && updatedDietician) {
            responseBody = {
              statusCode: 200,
              statusMessage: "Client details updated successfully!",
              updatedUser: updatedUser,
            };
          } else {
            responseBody = {
              statusCode: 400,
              statusMessage: `Cannot update Client details!`,
            };
          }
        } else if (values.userRole == "TRAINER") {
          let updatedTrainer = await Trainer.update(
            {
              availableSlots: newSlots,
            },
            {
              where: {
                UserId: relatedTo,
              },
            }
          );
          let updatedUser = await Client.update(
            {
              TrainerId: roleId,
              updatedAt: new Date(),
            },
            {
              where: {
                UserId: relatedFrom,
              },
            }
          );
          if (updatedUser && updatedTrainer) {
            responseBody = {
              statusCode: 200,
              statusMessage: "Client details updated successfully!",
              updatedUser: updatedUser,
            };
          } else {
            responseBody = {
              statusCode: 400,
              statusMessage: `Cannot update Client details!`,
            };
          }
        } else if (values.userRole == "PHYSICIAN") {
          let updatedPhysician = await Trainer.update(
            {
              availableSlots: newSlots,
            },
            {
              where: {
                UserId: relatedTo,
              },
            }
          );
          let updatedUser = await Client.update(
            {
              PhysicianId: roleId,
              updatedAt: new Date(),
            },
            {
              where: {
                UserId: relatedFrom,
              },
            }
          );
          if (updatedUser && updatedPhysician) {
            responseBody = {
              statusCode: 200,
              statusMessage: "Client details updated successfully!",
              updatedUser: updatedUser,
            };
          } else {
            responseBody = {
              statusCode: 400,
              statusMessage: `Cannot update Client details!`,
            };
          }
        } else if (values.userRole == "CAREPROVIDER") {
          let updatedCareProvider = await CareProvider.update(
            {
              availableSlots: newSlots,
            },
            {
              where: {
                UserId: relatedTo,
              },
            }
          );
          let updatedUser = await Client.update(
            {
              CareProviderId: roleId,
              updatedAt: new Date(),
            },
            {
              where: {
                UserId: relatedFrom,
              },
            }
          );
          if (updatedUser && updatedCareProvider) {
            responseBody = {
              statusCode: 200,
              statusMessage: "Client details updated successfully!",
              updatedUser: updatedUser,
            };
          } else {
            responseBody = {
              statusCode: 400,
              statusMessage: `Cannot update Client details!`,
            };
          }
        }
      }
      res.send({
        msg: "Appointment created Successfully",
        type: "success",
        responseBody,
      });
    });
  } catch (err) {
    res.status(500).send({ msg: err.message, type: "error" });
  }
};
exports.fetchAppointments = async (req, res) => {
  try {
    var result;

    result = await Appointment.findAll({
      include: [
        { model: User, as: "relatedToUser" },
        { model: User, as: "relatedFromUser" },
      ],
    });

    if (!result || result.length < 1) {
      return res.send({ type: "success", msg: "No result found", data: [] });
    }
    if (result) {
      res.send({
        msg: "result fetched successfully!",
        type: "success",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).send({ msg: err.message, type: "error" });
  }
};
