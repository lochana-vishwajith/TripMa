const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const preferenceProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userdetails",
  },
  ageValue: {
    type: Number,
    required: true,
  },
  languageValue: {
    type: Number,
    required: true,
  },
  budgetValue: {
    type: Number,
    required: true,
  },
  transportValue: {
    type: Number,
    required: true,
  },
  ageVariation: {
    type: Number,
    required: true,
  },
  budgetVariation: {
    type: Number,
    required: true,
  },
});

const preferenceProfile = mongoose.model(
  "preferenceProfiles",
  preferenceProfileSchema
);
module.exports = preferenceProfile;
