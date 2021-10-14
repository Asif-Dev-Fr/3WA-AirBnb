const express = require('express');
const {addBooking, allBooking} = require("../controllers/booking");
const {isAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/estate/:id", isAuth, addBooking);

module.exports = router
