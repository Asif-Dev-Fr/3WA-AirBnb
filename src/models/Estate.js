const mongoose = require("mongoose");

const EstateSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    zipCode: {
      type: String,
      trim: true,
      required: true
    },
    country: {
      type: String,
      trim: true,
      required: true
    },
    lat: {
      type: Number,
      default: 48.866667,
    },
    lng: {
      type: Number,
      default: 2.333333,
    },
    photos: [String]
  },
  { timestamps: true }
);

const Estate = mongoose.model('Estate', EstateSchema );

module.exports = Estate;
