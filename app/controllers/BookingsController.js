const Bookings = require("../models/BookingsModel");
const Rooms = require("../models/RoomsModel");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.StripeSecret);

const BookingsController = {
  bookRoom: async (req, res) => {
    const {
      roomsDetails,
      userId,
      checkInDate,
      checkOutDate,
      totalAmount,
      token,
    } = req.body;

    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const payment = await stripe.paymentIntents.create(
        {
          amount: totalAmount * 100,
          customer: customer.id,
          currency: "inr",
          receipt_email: token.email,
          payment_method_types: ["card"],
        },
        {
          idempotencyKey: uuidv4(),
        }
      );
      if (payment) {
        const newBookings = new Bookings({
          roomsDetails: roomsDetails.name,
          userId,
          checkInDate: moment(checkInDate).format("DD-MM-YYYY"),
          checkOutDate: moment(checkOutDate).format("DD-MM-YYYY"),
          totalAmount,
          transactionId: `receipt_${Math.floor(2) + Math.random(12)}`,
        });

        const bookings = await newBookings.save();
        // console.log(bookings);

        const tempRoom = await Rooms.findOne({ _id: roomsDetails._id });

        tempRoom.currentBookings.push({
          bookingsId: bookings._id,
          checkInDate: moment(checkInDate).format("DD-MM-YYYY"),
          checkOutDate: moment(checkOutDate).format("DD-MM-YYYY"),
          userId: userId,
          status: bookings.status,
        });
        // console.log(tempRoom);
        await tempRoom.save();
      }
      res.status(200).send("Payment Successful, Room booked");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getBookingsById: async (req, res) => {
    try {
      const userId = req.body.userId;
      const bookings = await Bookings.find({ userId: userId });
      res.status(200).send(bookings);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
module.exports = BookingsController;
