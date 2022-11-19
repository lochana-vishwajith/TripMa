const LiveIssue = require("../Models/LiveIssueModel");
const NearByIssues = require("../Services/CheckIssuesNearBy");
const IssueSuggestions = require("../Services/SafetyPrecautionsMapper");
const RiskSuggestion = require("../Models/StaticSuggestionsModel");

const addLiveIssue = async (req, res) => {
  const { location, date, IssueType, Issue, description, IssueRating, time,address } =
    req.body;

  const isUserAccept = false;
  try {
    const liveIssueObj = LiveIssue({
      location,
      date,
      time,
      IssueType,
      IssueRating,
      Issue,
      description,
      isUserAccept,
      address,
      useracceptPrecaution: "No accepted precautions to show",
      userComments: "No comments to show",
      useracceptSuggestion: "No accept suggestions to show",
      suggestions: [],
      suggestionsScore: false,
    });

    let result = await IssueSuggestions.getSuggestionsforIssue(liveIssueObj);

    await result
      .save()
      .then((result) => {
        console.log("live issue Suggestion  called");
        IssueSuggestions.getSuggestionsforIssue(liveIssueObj);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const getLiveIssues = async (req, res) => {
  try {
    await LiveIssue.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getNearByIssues = async (req, res) => {
  try {
    const { origin } = req.body;
    console.log("hit aftr req body");
    result = await NearByIssues.getIssues(origin);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const UpdateIssueStatus = async (req, res) => {
  const { id } = req.body;
  console.log("awaaa");
  try {
    let issueob = await LiveIssue.findByIdAndUpdate(
      { _id: id },
      {
        suggestions: [],
        suggestionsScore: false,
        userComments: "No User Comments to show",
      }
    );
    return res.status(200).send({ result: "done" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const UpdateIssueByUser = async (req, res) => {
  const { id, useracceptSuggestion, useracceptPrecaution, userComments } =
    req.body;

  console.log("awaaa");
  try {
    let issueob = await LiveIssue.findByIdAndUpdate(
      { _id: id },
      {
        suggestions: [],
        suggestionsScore: false,
        isUserAccept: true,
        useracceptSuggestion: useracceptSuggestion,
        useracceptPrecaution: useracceptPrecaution,
        userComments: userComments,
      }
    );
    return res.status(200).send({ result: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

// const UpdateIssueStatus = async (req, res) => {
//   const { id } = req.body;
//   try {
//     let issueob = await RiskSuggestion.find({ _id: id })
//       .then((response) => {
//         res.status(200).send(response);
//         issueob.suggestions = [];
//         issueob.suggestionsScore = false;
//         RiskSuggestion.findByIdAndUpdate(
//           { issueob },
//           { new: true }
//         ).then((res)=>{

//         }).catch((error) => {
//         console.log(" error - ", error);
//         res.status(500).send(error);
//       });
//       })
//       .catch((error) => {
//         console.log(" error - ", error);
//         res.status(500).send(error);
//       });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).send("Server Error");
//   }
// };

module.exports = {
  addLiveIssue,
  getLiveIssues,
  getNearByIssues,
  UpdateIssueStatus,
  UpdateIssueByUser,
};
/*


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

*/
