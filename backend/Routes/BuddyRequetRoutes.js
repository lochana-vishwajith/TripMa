const express = require("express");
const router = express.Router();

const {
  requestbuddy,
  getBuddyRequests,
  deleteBuddyRequests,
  startCompanionshipEdit,
  getBuddiesWithouFiltering,
  getUserRequests,
} = require("../Controllers/BuddyRequetController");

//@route  POST /buddy
//@desc   Add BuddyReqests
//@access Public
router.post("/", requestbuddy);

//@route  GET /buddy
//@desc   get BuddyReqests
//@access Public
router.get("/:id/:tripdate/:requestId", getBuddyRequests);

//@route  DELETE /buddy
//@desc   delete BuddyReqests
//@access Public
router.delete("/request/:id", deleteBuddyRequests);

//@route  PUT /buddy
//@desc   put BuddyReqests
//@access Public
router.put("/:myUserId/:buddyId", startCompanionshipEdit);

//@route  GET /buddy
//@desc   get BuddyReqests
//@access Public
router.get("/allbuddies", getBuddiesWithouFiltering);

//@route  GET /buddy
//@desc   get BuddyReqests
//@access Public
router.get("/myRequest/:id", getUserRequests);

module.exports = router;
