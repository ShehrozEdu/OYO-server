const mongoose = require("mongoose");

const BookingsSchema = mongoose.Schema(
  {
    roomsDetails: { type: String, required: true },
    userId: { type: String, required: true },
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    total: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, default: "booked" },
  },
  {
    timestamps: true,
  }
);

const BookingsModel = mongoose.model("booking", BookingsSchema);

module.exports = BookingsModel;
