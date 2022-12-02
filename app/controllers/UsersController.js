const UserModel = require("../models/UserModel");

const UsersController = {
  register: async (req, res) => {
    const newUser = new UserModel(req.body);
    try {
      const user = await newUser.save();
      res.status(200).send({ message: "Registration Successful", user: user });
    } catch (error) {
      res.status(404).send(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne(
        {
          email: email,
          password: password,
        },
        { email: 1 }
      );
      if (user) {
        res.status(200).send({ message: "Login Successful", user: user });
      } else {
        res.status(404).send("Check Credentials");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  allUsers: async (req, res) => {
    try {
      const result = await UserModel.find();
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },
};

module.exports = UsersController;
