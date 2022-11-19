//const onGoingTrip = require("../Models/OnGoingTripsModel");
const { call } = require("../Services/SafetyIndexForUserPreferences");

const SafetyPreferenceMatrix = async (req, res) => {
  const { location, objs } = req.body;

  try {
    console.log("service module safepres todaysss");
    result = await call(location, objs);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("error");
  }
};

module.exports = { SafetyPreferenceMatrix };
