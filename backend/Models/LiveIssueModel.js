const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveIssueTemplate = new Schema({
  location: {
    latitude: Number,
    longitude: Number,
  },
  address: { type: String },
  date: { type: String },
  time: { type: String },

  Issue: {
    type: String,
  },
  IssueRating: {
    type: String,
  },
  IssueType: {
    type: String,
  },
  description: {
    type: String,
  },
  suggestions: [
    {
      issue: { type: String },
      descriptions: { type: String },
      precautions: { type: String },
    },
  ],
  suggestionsScore: {
    type: Boolean,
  },
  isUserAccept: {
    type: Boolean,
  },
  useracceptSuggestion: {
    type: String,
  },
  useracceptPrecaution: {
    type: String,
  },
  userComments: {
    type: String,
  },
});

const LiveIssueTemplateModel = mongoose.model(
  "LiveIssueTemplate",
  LiveIssueTemplate
);
module.exports = LiveIssueTemplateModel;
