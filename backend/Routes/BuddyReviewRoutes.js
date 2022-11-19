const express = require("express");
const router = express.Router();

const {
  addReviewsForBuddy,
  getReviewsForUser,
} = require("../Controllers/BuddyReviewControllers");

//@route  POST /buddyReviews
//@desc   Add buddyReviews
//@access Public
router.post("/review", addReviewsForBuddy);

//@route  GET /buddyReviews
//@desc   get buddyReviews
//@access Public
router.get("/review/:id", getReviewsForUser);

module.exports = router;
