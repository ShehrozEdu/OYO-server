const RoomsModel = require("../models/RoomsModel");
const Rooms = require("../resources/rooms.json");

const RoomsController = {
  addRooms: async (req, res) => {
    try {
      let result = await RoomsModel.insertMany(Rooms);
      res.status(200).send({
        status: true,
        message: "Rooms added successfully",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRooms: async (req, res) => {
    try {
      let result = await RoomsModel.find();
      res.status(200).send({
        status: true,
        rooms: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRoomByLocationId: async function (req, res) {
    const { lid, city } = req.query;
    try {
      let data = await RoomsModel.find({
        city: { $regex: city + ".*", $options: "i" },
        city_id: Number(lid),
      });
      res.status(200).send({ status: true, result: data });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRoomsByID: async (req, res) => {
    try {
      let { id } = req.params;
      let data = await RoomsModel.findById(id);

      res.status(200).send({
        status: true,
        rooms: data,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = RoomsController;
