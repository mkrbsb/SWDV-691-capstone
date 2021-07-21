const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    min: 2,
    max: 26,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    min: 2,
    max: 26,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    min: 5,
    max: 50,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 50,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  street_address1: {
    type: String,
    min: 2,
    max: 26,
    required: true,
    lowercase: true,
    trim: true,
  },
  street_address2: {
    type: String,
    min: 0,
    max: 26,
    lowercase: true,
    trim: true,
  },
  city: {
    type: String,
    min: 2,
    max: 26,
    lowercase: true,
    trim: true,
  },
  state: {
    type: String,
    min: 2,
    max: 26,
    lowercase: true,
    trim: true,
  },
  zipcode: {
    type: Number,
    min: 11111,
    max: 99999,
    required: true,
    lowercase: true,
    trim: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
