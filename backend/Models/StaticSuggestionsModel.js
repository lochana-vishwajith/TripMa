const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuggestionTemplate = new Schema({
  IssueType: {
    location: { latitude: { type: String }, longitude: { type: String } },
    date: { type: String },
    time: { type: String },
    criticality: { type: String },
    type: { type: String },
    description: { type: String },
    issue: { type: String },
  },
  suggestions: {
    type: String,
  },
  precautions: { type: String },
});
const SuggestionsModel = mongoose.model("suggestions", SuggestionTemplate);
module.exports = SuggestionsModel;
