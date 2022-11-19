const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companiondetails = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  companionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  companionStatus: {
    type: String,
    required: true,
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "buddyrequests",
  },
  endedby: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "userdetails",
    },
  ],
});

const companiondetailsModel = mongoose.model(
  "companionships",
  companiondetails
);
module.exports = companiondetailsModel;
