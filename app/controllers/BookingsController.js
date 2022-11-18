const Bookings = require("../models/BookingsModel");
const Rooms = require("../models/RoomsModel");
const moment = require("moment");

const BookingsController = {
  bookRoom: async (req, res) => {
    const { roomsDetails, userId, checkInDate, checkOutDate, total } = req.body;

    try {
      const newBookings = new Bookings({
        roomsDetails: roomsDetails.name,
        userId,
        checkInDate: moment(checkInDate).format("MM-DD-YYY"),
        checkOutDate: moment(checkOutDate).format("MM-DD-YYY"),
        total,
        transactionId: `receipt_${Math.floor(2) + Math.random(12)}`,
      });

      const bookings = await newBookings.save();
      // console.log(bookings);

      const tempRoom = await Rooms.findOne({ _id: roomsDetails._id });

      tempRoom.currentBookings.push({
        bookingsId: bookings._id,
        checkInDate: moment(checkInDate).format("MM-DD-YYY"),
        checkOutDate: moment(checkOutDate).format("MM-DD-YYY"),
        userId: userId,
        status: bookings.status,
      });
      // console.log(tempRoom);
      await tempRoom.save();
      res.status(200).send("Room Booked Successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
module.exports = BookingsController;
