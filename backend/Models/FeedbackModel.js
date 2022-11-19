const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
    required: true,
  },
  // userID: {
  //   type: String,
  //   required: false,
  // },

  feedback: {
    type: String,
    required: true,
  },
  feedbackType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  sentimentValue: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userdetails",
      required: false,
    },
  ],
});

const UserFeedback = mongoose.model("Feedbacks", Feedback);
module.exports = UserFeedback;
