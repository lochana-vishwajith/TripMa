const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuddyRequest = new Schema({
  tripdate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  isFound: {
    type: Boolean,
    required: true,
  },
  isPublicTransportUsed: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  foundUid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
});

const BuddyRequestModel = mongoose.model("buddyrequests", BuddyRequest);
module.exports = BuddyRequestModel;
