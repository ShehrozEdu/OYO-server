const mongoose = require("mongoose");

const RoomsSchema = mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  city_id: { type: Number, required: true },
  ratings: { type: String, required: true },
  maxCount: { type: Number, required: true },
  roomType: { type: String, required: true },
  collections: { type: Array },
  amenities: { type: Array },
  collections_id: { type: Array },
  accommodation: { type: Array },
  accommodation_id: { type: Array },
  category: { type: Array },
  category_id: { type: Array },
  phoneNumber: { type: Number, required: true },
  discountedRate: { type: Number, required: true },
  actualRate: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrls: { type: Array },
  currentBookings: [],
});
const RoomsModel = mongoose.model("room", RoomsSchema);
module.exports = RoomsModel;
