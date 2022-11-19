const express = require("express");
const router = express.Router();

const {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
  likeFeedback,
  removeFeedbackLike,
  validateFeedback,
  getPositiveFeedbacks,
  getNegativeFeedbacks,
  getPositiveFeedbacksWeb,
  getNegativeFeedbacksWeb,
} = require("../Controllers/FeedbackController");

router.post("/add", validateFeedback);
router.get("/", getFeedbacks);
router.put("/delete", deleteFeedback); //used put method due to the issue in emulater
router.put("/like", likeFeedback);
router.put("/dislike", removeFeedbackLike);
router.get("/positive", getPositiveFeedbacks);
router.get("/negative", getNegativeFeedbacks);
router.get("/positive-web", getPositiveFeedbacksWeb);
router.get("/negative-web", getNegativeFeedbacksWeb);

module.exports = router;
