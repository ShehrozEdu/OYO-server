const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
const UsersModel = mongoose.model("user", UsersSchema);
module.exports = UsersModel;
