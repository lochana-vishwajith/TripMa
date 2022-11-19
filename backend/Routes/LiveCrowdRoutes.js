const express = require("express");
const router = express.Router();

const {
  addLiveCrowd,
  getLiveCrowd,
  getNearbyUpdates,
  getFutureCrowd,
  getRoute
} = require("../Controllers/LiveCrowdController");

router.post("/", addLiveCrowd);
router.get("/", getLiveCrowd);
router.get("/:selectedLat/:selectedLng/:crowdPref/:weatherPref", getNearbyUpdates);
router.get("/:Lat/:Lng", getFutureCrowd);
router.get("/route/:crowdPref/:weatherPref", getRoute);
// router.get("/near", getNearbyUpdates);

module.exports = router;