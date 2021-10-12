const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User"},
    _estate: { type: Schema.Types.ObjectId, ref: "Estate"},
    start_date: { type: Date },
    end_date: { type: Date },
  },{ timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema );

module.exports = Booking;
