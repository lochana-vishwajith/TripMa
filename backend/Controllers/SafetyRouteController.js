//const onGoingTrip = require("../Models/OnGoingTripsModel");
const { nearbyIssueCountRoute } = require("../Services/RoadIssuePredictor");

// const createSafetyMetrix = async (req, res) => {
//   const { routecords } = req.body;
//   try {
//     console.log("service module for safety index started");
//     console.log(routecords.latitude + "one ewa");
//     const safeRoute = new SafeRoute(routecords);
//     result = await safeRoute.startCalculatingMatrix();
//     await res.status(200).send(result);
//   } catch (err) {
//     return res.status(500).send("error");
//   }
// };

const IssueList = async (req, res) => {
  console.log("hit");
  const { routecords } = req.body;
  try {
    console.log("service module for safety index started");
    console.log("lssdsad");
    console.log(routecords.latitude + "one ewa");

    let result = await nearbyIssueCountRoute(routecords);

    console.log(result + "rresuss");
    await res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { IssueList };
