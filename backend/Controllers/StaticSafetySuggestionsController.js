const RiskSuggestion = require("../Models/StaticSuggestionsModel");
const liveIssue = require("../Models/LiveIssueModel");

const addSuggestions = async (req, res) => {
  const { IssueType, Suggestions } = req.body;

  try {
    const SuggestionObj = RiskSuggestion({
      IssueType,
      Suggestions,
      precautions,
    });

    await SuggestionObj.save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send(err);
  }
};

const getsuggestions = async (req, res) => {
  try {
    await RiskSuggestion.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getSugestionforRisk = async (req, res) => {
  const IssueKey = req.params.id;
  console.log("id", IssueKey);
  try {
    await RiskSuggestion.find({ IssueKey: IssueKey })
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

const updateSuggestions = async (req, res) => {
  const { IssueKey, Suggestions } = req.body;
  try {
    await updateSuggestions
      .findByIdAndUpdate(
        { Suggestions },

        { new: true }
      )
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(" error - ", error);
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const addSuggestion = async (req, res) => {
  console.log("awaaa");
  const { id, obj } = req.body;

  console.log(obj);

  try {
    const SuggestionObj = RiskSuggestion(obj);

    let result = await SuggestionObj.save();

    let resulttwo = await liveIssue.findByIdAndUpdate(
      { _id: id },
      {
        isUserAccept: true,
        useracceptSuggestion: result.suggestions,
        suggestionsScore: true,
        useracceptPrecaution: result.precautions,
        userComments: "No User Comments to show",
      }
    );
    console.log("resulttwo", resulttwo);
    res.status(200).send(resulttwo);
  } catch (error) {
    console.log(e);
    return res.status(500).send(err);
  }
};

module.exports = {
  getSugestionforRisk,
  getsuggestions,
  addSuggestion,
  updateSuggestions,
};
