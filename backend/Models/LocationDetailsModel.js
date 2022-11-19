const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationDetail = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  locationPlace: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const LocationDetailsModel = mongoose.model("locationdetails", locationDetail);
module.exports = LocationDetailsModel;
