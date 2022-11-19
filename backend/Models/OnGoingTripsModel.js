const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onGoingTrip = new Schema({
  userId: {},
  isUsingHotelpackage: {
    type: Boolean,
    required: true,
  },
  currentLocation: [],

  locationsToTravel: [],
  issuesFaced: {
    notifyIssuetoBoolen: Boolean,
  },
  description: {
    type: String,
  },
});

const onGoingTripModel = mongoose.model(
  "onGoingTrips",
  onGoingTrip
);
module.exports = onGoingTripModel;
