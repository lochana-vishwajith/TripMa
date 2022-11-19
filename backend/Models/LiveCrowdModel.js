const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveCrowd = new Schema({
  location: { lat: { type: String }, lng: { type: String } },
  date: {
    type: Date,
    required: true,
  },
  crowd: {
    type: Number,
    required: true,
  },
  openStatus: {
    type: Number,
    required: true,
  },
  weather: {
    type: Number,
    required: true,
  },
  visit: {
    type: Number,
    required: true,
  },
  placeType: {
    type: Number,
    required: true,
  },

});

const LiveCrowdModel = mongoose.model(
  "LiveCrowdStatus",
  LiveCrowd
);
module.exports = LiveCrowdModel;
