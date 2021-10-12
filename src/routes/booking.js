const express = require('express');
const {addBooking, allBooking} = require("../controllers/booking");
const {setUpProfile} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/estate/:id", setUpProfile, addBooking);

module.exports = router
