const express = require("express");
const router = express.Router();

const {
  addSuggestion,
  getsuggestions,
  getSugestionforRisk,
  updateSuggestions,
} = require("../Controllers/StaticSafetySuggestionsController");

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/", addSuggestion);

router.get("/", getsuggestions);

router.get("/:id", getSugestionforRisk);

router.put("/", updateSuggestions);

module.exports = router;
