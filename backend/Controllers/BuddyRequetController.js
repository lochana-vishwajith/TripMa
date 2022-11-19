const BuddyRequestModel = require("../Models/BuddyRequetModel");
const {
  buddyDistanceFinder,
} = require("../Services/BuddyDistanceFinderService");
const {
  scoringOnDistance,
  preferencesPointAllocate,
  calculateTotalScoreForBuddies,
} = require("../Services/BuddyFindingWeightageScoreService");
const moment = require("moment");

const requestbuddy = (req, res) => {
  const {
    tripdate,
    destination,
    budget,
    userId,
    foundUid,
    isPublicTransportUsed,
  } = req.body;

  try {
    const requestDetail = new BuddyRequestModel({
      tripdate,
      destination,
      budget,
      userId,
      isFound: false,
      foundUid,
      isPublicTransportUsed,
      createdAt: moment(),
    });

    requestDetail
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getBuddyRequests = async (req, res) => {
  const { id, tripdate, requestId } = req.params;
  const date = moment(tripdate).format("YYYY-MM-DD");
  console.log("buddy request fetching started");
  try {
    await BuddyRequestModel.find({ isFound: false, tripdate: date })
      .populate(
        "userId",
        "fullName email skills image image country DOB preferenceProfileId"
      )
      .populate({
        path: "userId",
        populate: {
          path: "preferenceProfileId",
          model: "preferenceProfiles",
        },
      })
      .then(async (result) => {
        console.log("result len", result.length);
        if (result.length > 0) {
          const buddyDistance = await buddyDistanceFinder(
            result,
            id,
            requestId
          );

          const scoredBuddies = await scoringOnDistance(
            buddyDistance.buddiesWithDistance
          );

          const buddiesWithScore = await preferencesPointAllocate(
            scoredBuddies,
            buddyDistance.requestedUser
          );

          const fullyScoredBuddies = await calculateTotalScoreForBuddies(
            buddiesWithScore,
            buddyDistance.requestedUser
          );
          console.log("returened buddy : ", fullyScoredBuddies);
          res.status(200).json(fullyScoredBuddies);
        } else {
          res.status(200).json([]);
        }
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const startCompanionshipEdit = async (req, res) => {
  const { myUserId, buddyId } = req.params;

  console.log("myUserId : ", myUserId);
  console.log("buddyId : ", buddyId);

  try {
    BuddyRequestModel.updateOne(
      { _id: myUserId },
      {
        $set: { isFound: true },
      }
    )
      .then((result) => {
        BuddyRequestModel.updateOne(
          { _id: buddyId },
          {
            $set: { isFound: true },
          }
        ).then((results) => {
          res.status(200).json({ result, results });
        });
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteBuddyRequests = (req, res) => {
  const { id } = req.params;
  try {
    console.log("id : ", id);
    BuddyRequestModel.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getBuddiesWithouFiltering = async (req, res) => {
  try {
    BuddyRequestModel.find()
      .populate(
        "userId",
        "fullName email phoneNumber DOB occupation skills  image country"
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getUserRequests = (req, res) => {
  console.log("Get requests requested by the user");
  const { id } = req.params;
  try {
    BuddyRequestModel.find({ userId: id })
      .populate("userId", "preferenceProfileId")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  requestbuddy,
  getBuddyRequests,
  deleteBuddyRequests,
  startCompanionshipEdit,
  getBuddiesWithouFiltering,
  getUserRequests,
};
