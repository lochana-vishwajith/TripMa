const axios = require("axios");

const BuddyReviewAnalyzer = (reviews) => {
  console.log("buddy review analyzing started : ", reviews);

  return new Promise(async (resolve, reject) => {
    try {
      let buddyReviews = [];

      if (reviews.length > 0) {
        for (let i = 0; i < reviews.length; i++) {
          buddyReviews.push(reviews[i].userReview);
        }
      }

      const userReviews = {
        feedback: buddyReviews,
      };

      console.log("user Reviews : ", userReviews);

      const analyzedReviews = await axios.post(
        `https://tripma-nlp-custom-model.herokuapp.com/buddy`,
        userReviews
      );

      console.log("analyzedReviews : ", analyzedReviews);
      let analyzedReviewsData = analyzedReviews.data;

      let positiveRatingsCount = 0;

      for (let k = 0; k < analyzedReviewsData.length; k++) {
        if (analyzedReviewsData[k] === "positive") {
          positiveRatingsCount = positiveRatingsCount + 1;
        }
      }

      console.log("positiveRatingsCount : ", positiveRatingsCount);

      let starPositiveRatingCount =
        (Number(positiveRatingsCount) * 5) / Number(buddyReviews.length);

      console.log("starPositiveRatingCount : ", starPositiveRatingCount);

      resolve(starPositiveRatingCount);
    } catch (error) {
      console.log(
        "Failed to generate distances:" + JSON.stringify(error.messege)
      );
      reject(error);
    }
  });
};

module.exports = { BuddyReviewAnalyzer };
