const express = require("express");
const router = express.Router();

const {
  SafetyPreferenceMatrix,
} = require("../Controllers/SafetyUserPreferencesController");

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/", SafetyPreferenceMatrix);

module.exports = router;
