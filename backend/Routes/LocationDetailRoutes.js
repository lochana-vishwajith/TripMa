const express = require("express");
const {
  addLocationDetails,
  getLocationDetail,getLocationDetailById
} = require("../Controllers/LocationDetailsController");
const router = express.Router();

//@route  POST /locationdetails
//@desc   Add locationdetails
//@access Public
router.post("/location", addLocationDetails);

//@route  GET /buddyReviews
//@desc   get buddyReviews
//@access Public
router.get("/location", getLocationDetail);

//@route  GET /buddyReviews
//@desc   get buddyReviews
//@access Public
router.get("/location/:id", getLocationDetailById);

module.exports = router;
