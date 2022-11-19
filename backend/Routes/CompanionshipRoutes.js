const express = require("express");
const router = express.Router();

const {
  getAllCompanionships,
  postCompanionship,
  deleteCompanionship,
  setReviewedUser,
} = require("../Controllers/CompanionshipController");

//@route  POST /companionship
//@desc   Add companionship
//@access Public
router.post("/companionship", postCompanionship);

//@route  GET /companionship
//@desc   Fetch companionship
//@access Public
router.get("/myCompanionships/:id", getAllCompanionships);

//@route  GET /companionship
//@desc   Fetch companionship
//@access Public
router.delete("/deleteCompanionships/:id", deleteCompanionship);

//@route  GET /companionship
//@desc   Fetch companionship
//@access Public
router.put("/reviewUserId/:id", setReviewedUser);

module.exports = router;
