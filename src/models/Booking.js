const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    _user: Schema.Types.ObjectId,
    _estate: Schema.Types.ObjectId,
    start_date: { type: Date },
    end_date: { type: Date },
  },{ timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema );

module.exports = Booking;
