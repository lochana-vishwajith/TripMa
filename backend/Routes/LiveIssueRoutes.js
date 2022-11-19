const express = require("express");
const router = express.Router();

const {
  addLiveIssue,
  getLiveIssues,
  getNearByIssues,
  UpdateIssueStatus,
  UpdateIssueByUser
} = require("../Controllers/LiveIssueController");

router.post("/add", addLiveIssue);
router.get("/", getLiveIssues);
router.get("/", getLiveIssues);
router.post("/nearbyissues", getNearByIssues);
router.post("/UpdateIssueStatus", UpdateIssueStatus);
router.post("/UpdateIssueStatusByUser", UpdateIssueByUser);

module.exports = router;
