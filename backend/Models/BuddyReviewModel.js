const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buddyReviewDetails = new Schema({
  userReview: {
    type: String,
    required: true,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  reviewedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  companionshipId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "companionships",
  },
});

const buddyReview = mongoose.model("buddyReviews", buddyReviewDetails);
module.exports = buddyReview;
