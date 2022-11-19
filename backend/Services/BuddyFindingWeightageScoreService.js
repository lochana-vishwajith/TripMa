const moment = require("moment");

const scoringOnDistance = (buddies) => {
  console.log(buddies);
  return new Promise(async (resolve, reject) => {
    console.log("starting adding score based on the distance : ", buddies);

    try {
      for (let i = 0; i < buddies.length; i++) {
        let distanceUser = JSON.parse(buddies[i].distanceDetails)[0].elements[0]
          .distance.text;
        const noOfKm = Number(distanceUser.split(" ")[0]);

        let distanceScore = 0;

        if (0 < noOfKm && noOfKm <= 5) {
          distanceScore = 1;
        } else if (noOfKm > 5 && noOfKm <= 10) {
          distanceScore = 0.75;
        } else if (noOfKm > 10 && noOfKm <= 20) {
          distanceScore = 0.5;
        } else if (noOfKm > 20 && noOfKm <= 25) {
          distanceScore = 0.25;
        } else if (noOfKm > 25 && noOfKm <= 30) {
          distanceScore = 0;
        }

        const scores = {
          distanceScore: distanceScore,
        };

        buddies[i]["scores"] = scores;
      }
      resolve(buddies);
    } catch (error) {
      console.log(
        "Failed to add scores based on the distances:" + JSON.stringify(error)
      );
      reject();
    }
  });
};

const preferencesPointAllocate = (buddies, userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(
        "starting points allocation system based on preferences and deviation values "
      );

      const USERPREFERENCES = userDetails.userId.preferenceProfileId;
      const USER_LANGUAGE_SKILLS = userDetails.userId.skills.split(",");
      const USER_AGE = moment(userDetails.userId.DOB, "YYYY-MM-DD")
        .month(0)
        .from(moment().month(0))
        .split(" ")[0];

      const USER_BUDGET = Number(userDetails.budget);
      const USER_TRANSPORT_PREFERENCE = userDetails.isPublicTransportUsed;

      const LANGUAGE_PRIORITY_VALUE = USERPREFERENCES.languageValue;
      const TRANSPORTATION_PRIORITY_VALUE = USERPREFERENCES.transportValue;

      const AGE_VARIATION = USERPREFERENCES.ageVariation;
      const BUDGET_VARIATION = USERPREFERENCES.budgetVariation;

      const AGE_VARIATION_Q1 = AGE_VARIATION / 3;
      const AGE_VARIATION_Q2 = (AGE_VARIATION * 2) / 3;
      const AGE_VARIATION_Q3 = AGE_VARIATION;

      const BUDGET_VARIATION_Q1 = BUDGET_VARIATION / 3;
      const BUDGET_VARIATION_Q2 = (BUDGET_VARIATION * 2) / 3;
      const BUDGET_VARIATION_Q3 = BUDGET_VARIATION;

      for (let i = 0; i < buddies.length; i++) {
        let preferences = buddies[i].requestDetails.userId.preferenceProfileId;

        let AGE_SCORE = 1;
        let BUDGET_SCORE = 1;
        let LANGUAGE_SCORE = 0;
        let TRANSPORT_SCORE = 0;

        //Age Score Calculator
        const buddyAge = moment(
          buddies[i].requestDetails.userId.DOB,
          "YYYY-MM-DD"
        )
          .month(0)
          .from(moment().month(0))
          .split(" ")[0];

        if (buddyAge === USER_AGE) {
          AGE_SCORE = 1;
        } else if (
          (buddyAge > USER_AGE &&
            buddyAge <= Number(USER_AGE) + Number(AGE_VARIATION_Q1)) ||
          (buddyAge < USER_AGE &&
            buddyAge >= Number(USER_AGE) - Number(AGE_VARIATION_Q1))
        ) {
          AGE_SCORE = 0.75;
        } else if (
          (buddyAge > Number(USER_AGE) + Number(AGE_VARIATION_Q1) &&
            buddyAge <= Number(USER_AGE) + Number(AGE_VARIATION_Q2)) ||
          (buddyAge < Number(USER_AGE) - Number(AGE_VARIATION_Q1) &&
            buddyAge >= Number(USER_AGE) - Number(AGE_VARIATION_Q2))
        ) {
          AGE_SCORE = 0.5;
        } else if (
          (buddyAge > Number(USER_AGE) + Number(AGE_VARIATION_Q2) &&
            buddyAge <= Number(USER_AGE) + Number(AGE_VARIATION_Q3)) ||
          (buddyAge < Number(USER_AGE) - Number(AGE_VARIATION_Q2) &&
            buddyAge >= Number(USER_AGE) - Number(AGE_VARIATION_Q3))
        ) {
          AGE_SCORE = 0.25;
        } else if (
          buddyAge > Number(USER_AGE) + Number(AGE_VARIATION_Q3) ||
          buddyAge < Number(USER_AGE) - Number(AGE_VARIATION_Q3)
        ) {
          AGE_SCORE = 0;
        }

        //Budget Score Calculator
        const buddyBudget = Number(buddies[i].requestDetails.budget);

        if (buddyBudget === USER_AGE) {
          BUDGET_SCORE = 1;
        } else if (
          (buddyBudget > USER_BUDGET &&
            buddyBudget <= Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q1)) ||
          (buddyBudget < USER_AGE &&
            buddyBudget >= Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q1))
        ) {
          BUDGET_SCORE = 0.75;
        } else if (
          (buddyBudget > Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q1) &&
            buddyBudget <= Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q2)) ||
          (buddyBudget < Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q1) &&
            buddyBudget >= Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q2))
        ) {
          BUDGET_SCORE = 0.5;
        } else if (
          (buddyBudget > Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q2) &&
            buddyBudget <= Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q3)) ||
          (buddyBudget < Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q2) &&
            buddyBudget >= Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q3))
        ) {
          BUDGET_SCORE = 0.25;
        } else if (
          buddyBudget > Number(USER_BUDGET) + Number(BUDGET_VARIATION_Q3) ||
          buddyBudget < Number(USER_BUDGET) - Number(BUDGET_VARIATION_Q3)
        ) {
          BUDGET_SCORE = 0;
        }

        let isCommonLanguageAvailable = false;
        let isTransportConsidered = false;
        let isLanguageConsidered = false;
        let isTransportMatching = false;

        if (LANGUAGE_PRIORITY_VALUE > 2) {
          LANGUAGE_SCORE = 1;
          isLanguageConsidered = true;
          const LANGUAGE_SKILLS =
            buddies[i].requestDetails.userId.skills.split(",");

          for (let j = 0; j < USER_LANGUAGE_SKILLS.length; j++) {
            if (LANGUAGE_SKILLS.includes(USER_LANGUAGE_SKILLS[i])) {
              isCommonLanguageAvailable = true;
              break;
            }
          }
        }

        if (TRANSPORTATION_PRIORITY_VALUE > 2) {
          TRANSPORT_SCORE = 1;
          isTransportMatching = true;
          if (
            buddies[i].requestDetails.isPublicTransportUsed ===
            USER_TRANSPORT_PREFERENCE
          ) {
            isTransportConsidered = true;
          }
        }

        if (
          (isLanguageConsidered && !isCommonLanguageAvailable) ||
          (isTransportMatching && !isTransportConsidered)
        ) {
          buddies.splice(i, 1);
        }
        buddies[i].scores.ageScore = AGE_SCORE;
        buddies[i].scores.budgetScore = BUDGET_SCORE;
        buddies[i].scores.languageScore = LANGUAGE_SCORE;
        buddies[i].scores.transportScore = TRANSPORT_SCORE;
      }
      resolve(buddies);
    } catch (error) {
      console.log(
        "Failed to add scores based on the preferences:" + JSON.stringify(error)
      );
      reject();
    }
  });
};

const calculateTotalScoreForBuddies = (buddies, userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Starting the calculation of total matching score for buddy");

      const USERPREFERENCES = userDetails.userId.preferenceProfileId;

      const LANGUAGE_PRIORITY_VALUE = USERPREFERENCES.languageValue;
      const TRANSPORTATION_PRIORITY_VALUE = USERPREFERENCES.transportValue;
      const AGE_PRIORITY_VALUE = USERPREFERENCES.ageValue;
      const BUDGET_PRIORITY_VALUE = USERPREFERENCES.budgetValue;

      for (let i = 0; i < buddies.length; i++) {
        let OBTAINED_LANGUAGE_SCORE = buddies[i].scores.languageScore;
        let OBTAINED_AGE_SCORE = buddies[i].scores.ageScore;
        let OBTAINED_BUDGET_SCORE = buddies[i].scores.budgetScore;
        let OBTAINED_TRANSPORT_SCORE = buddies[i].scores.transportScore;
        let OBTAINED_DISTANCE_SCORE = buddies[i].scores.distanceScore;

        let totalScore =
          (Number(OBTAINED_BUDGET_SCORE) * Number(BUDGET_PRIORITY_VALUE) +
            Number(OBTAINED_AGE_SCORE) * Number(AGE_PRIORITY_VALUE) +
            Number(OBTAINED_LANGUAGE_SCORE) * Number(LANGUAGE_PRIORITY_VALUE) +
            Number(OBTAINED_TRANSPORT_SCORE) *
              Number(TRANSPORTATION_PRIORITY_VALUE)) /
            5 +
          Number(OBTAINED_DISTANCE_SCORE);

        let matchingPercentage = (totalScore * 100) / 5;

        console.log("total :", matchingPercentage);
        buddies[i].scores.totalScore = totalScore;
        buddies[i].scores.percentage = matchingPercentage;
      }
      resolve(buddies);
    } catch (error) {
      console.log(
        "Failed to calculate the matching scores:" + JSON.stringify(error)
      );
      reject();
    }
  });
};
module.exports = {
  scoringOnDistance,
  preferencesPointAllocate,
  calculateTotalScoreForBuddies,
};
