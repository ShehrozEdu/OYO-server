const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  city: { type: String },
  city_id: { type: Number },
  country_name: { type: String },
});

const LocationModel = mongoose.model("location", LocationSchema);

module.exports = LocationModel;
