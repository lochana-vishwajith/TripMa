const express = require("express");
const router = express.Router();

const {
  createPreferenceProfile,
  updatePreferences,
} = require("../Controllers/PreferenceProfileController");

//@route  POST api/preference
//@desc   Add preferences
//@access Public
router.post("/preference", createPreferenceProfile);
//@route  POST api/preference
//@desc   Add preferences
//@access Public
router.put("/preference/:id", updatePreferences);

module.exports = router;
