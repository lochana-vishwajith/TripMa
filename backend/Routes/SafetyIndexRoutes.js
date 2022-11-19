const express = require("express");
const router = express.Router();

const { IssueList } = require("../Controllers/SafetyRouteController");

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/", IssueList);

module.exports = router;
