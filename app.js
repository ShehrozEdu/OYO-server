require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = require("./app/routes/route");

//components

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`Start Booking rooms, don't see if its working or not!!`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
