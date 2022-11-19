const BuddyReview = require("../Models/BuddyReviewModel");
const {
  BuddyReviewAnalyzer,
} = require("../Services/BuddyReviewAnalyzerService");

const addReviewsForBuddy = async (req, res) => {
  const { userReview, reviewedBy, reviewedTo, companionshipId } = req.body;

  try {
    const reviewDetails = new BuddyReview({
      userReview,
      reviewedBy,
      reviewedTo,
      companionshipId,
    });

    await reviewDetails
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

const getReviewsForUser = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    await BuddyReview.find({ reviewedTo: id })
      .populate("reviewedBy", "fullName image")
      .then(async (result) => {
        let analyzedReviews = [];
        if (result.length > 0) {
          analyzedReviews = await BuddyReviewAnalyzer(result);
        }
        res.status(200).json({ reviews: result, rating: analyzedReviews });
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { addReviewsForBuddy, getReviewsForUser };
