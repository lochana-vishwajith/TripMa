const express = require("express");
const router = express.Router();

const { addPlaces, getAllPlaces } = require("../Controllers/PlacesControllers");

//@route  Get api/feedback
//@desc   Get all feedback
//@access Public
router.get("/", getAllPlaces);

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/", addPlaces);

module.exports = router;
