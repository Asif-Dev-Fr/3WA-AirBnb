const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'pending', 'disabled'],
    },
    role: {
      type: String,
      default: "user",
      enum: ['user', 'admin'],
    },
    isHouseOwner: {
      type: Boolean,
      default: false,
      required: true
    },
    avatar: String
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema );

module.exports = User;

