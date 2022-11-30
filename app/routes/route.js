const express = require("express");
const router = express.Router();
const RoomsController = require("../controllers/RoomsController");
const UsersController = require("../controllers/UsersController");
const LocationController = require("../controllers/LocationController");
const BookingsController = require("../controllers/BookingsController");

//------Rooms------//
router.post("/add-rooms", RoomsController.addRooms);
router.get("/get-rooms", RoomsController.getRooms);
router.get("/get-room-location-by-id", RoomsController.getRoomByLocationId);
router.get("/get-rooms/:id", RoomsController.getRoomsByID);

//------Users------//

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);

//------Location------//

router.get("/get-location", LocationController.getLocationList);
router.get("/get-location-by-name", LocationController.getLocationByCityName);
router.post("/add-location", LocationController.addLocationList);

//------Bookings------//
router.post("/book-rooms", BookingsController.bookRoom);
router.post("/getBookingsByUserId", BookingsController.getBookingsById);

module.exports = router;
