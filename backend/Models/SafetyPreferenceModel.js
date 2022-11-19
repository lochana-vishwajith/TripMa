const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SafetyPreferanceModel = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  policeScore: {
    type: Number,
    required: true,
  },
  hospitalScore: {
    type: Number,
    required: true,
  },
  pharmacyScore: {
    type: Number,
    required: true,
  },
  bust_stationScore: {
    type: Number,
    required: true,
  },
  railway_stationScore: {
    type: Number,
    required: true,
  },
  resturantScore: {
    type: Number,
    required: true,
  },
  gas_stationScore: {
    type: Number,
    required: true,
  },
  taxi_stationScore: {
    type: Number,
    required: true,
  },
});

const safetypreferenceProfile = mongoose.model(
  "SafetypreferenceProfile",
  SafetyPreferanceModel
);
module.exports = safetypreferenceProfile;
