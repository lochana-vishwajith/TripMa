const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlacesDetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: [{ type: String, required: true }],
});

const PlacesDetailsModel = mongoose.model("PlacesDetails", PlacesDetails);
module.exports = PlacesDetailsModel;
