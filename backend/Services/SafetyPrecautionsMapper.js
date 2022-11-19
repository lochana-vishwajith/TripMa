require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
var polyline = require("@googlemaps/polyline-codec");
const suggestions = require("../Models/StaticSuggestionsModel");
const LiveIssue = require("../Models/LiveIssueModel");
const moment = require("moment");
const WEEKSCORE = 10;
const DISTANCESCORE = 10;
const RATINGSCORE = 5;
const client = new Client({});

async function getSuggestionsforIssue(issueobj) {
  let IssueObject = issueobj;

  let hasSuggestions = false;
  console.log("issue obj", issueobj);

  let precautions = await suggestions.find();
  let selectedprecautions = [];
  // console.log("precautions", precautions);

  for (let i = 0; i < precautions.length; i++) {
    let selectedprecaution = precautions[i];
    let precautionattributes = selectedprecaution.IssueType;

    if (IssueObject.IssueType == precautionattributes.type) {
      if (precautionattributes.criticality == IssueObject.IssueRating) {
        selectedprecaution.issuetypescore = 5;
      } else if (
        (precautionattributes.criticality == "high" &&
          IssueObject.IssueRating == "medium") ||
        (precautionattributes.criticality == "medium" &&
          IssueObject.IssueRating == "high")
      ) {
        selectedprecaution.issuetypescore = 3;
      } else if (
        (precautionattributes.criticality == "medium" &&
          IssueObject.IssueRating == "low") ||
        (precautionattributes.criticality == "low" &&
          IssueObject.IssueRating == "medium")
      ) {
        selectedprecaution.issuetypescore = 3;
      } else if (
        (precautionattributes.criticality == "high" &&
          IssueObject.IssueRating == "low") ||
        (precautionattributes.criticality == "low" &&
          IssueObject.IssueRating == "high")
      ) {
        selectedprecaution.issuetypescore = 1;
      }
      const origin = IssueObject.location;
      const destination = precautionattributes.location;

      const distance = await getDistance(destination, origin);

      console.log("distance", distance);

      if (distance >= 50000) {
        selectedprecaution.distancescore = 0;
      } else {
        selectedprecaution.distancescore = Math.floor(
          ((5000 - distance) / 5000) * 10
        );
      }

      var start = moment(precautionattributes.date, "YYYY-MM-DD");
      var end = moment(IssueObject.date, "YYYY-MM-DD");

      console.log("precaution issued date", precautionattributes.date);
      console.log(" issue date", IssueObject.date);
      // Difference in number of Weeks
      const diff = Math.floor(
        Math.abs(moment.duration(start.diff(end)).asWeeks())
      );

      let diffweeks = diff;
      console.log("difference between weeks", diff);

      if (diffweeks > 10) {
        selectedprecaution.weekdiffScore = 0;
      } else {
        selectedprecaution.weekdiffScore = 10 - diffweeks;
      }

      selectedprecaution.totalsimilarityscore =
        (selectedprecaution.weekdiffScore +
          selectedprecaution.distancescore +
          selectedprecaution.issuetypescore) /
        (WEEKSCORE + RATINGSCORE + DISTANCESCORE);

      console.log(
        "Similarity score total",
        selectedprecaution.totalsimilarityscore
      );
      console.log(
        "selectedprecaution.suggestions",
        selectedprecaution.suggestions
      );

      if (selectedprecaution.totalsimilarityscore > 0.5) {
        hasSuggestions = true;
        selectedprecautions.push({
          issue: precautionattributes.issue,
          descriptions: selectedprecaution.suggestions,
          precautions: selectedprecaution.precautions,
          similarityscore: selectedprecaution.totalsimilarityscore,
        });
      }
    }
  }

  if (hasSuggestions) {
    console.log(selectedprecautions[0].similarityscore);
    selectedprecautions.sort(
      (a, b) => parseFloat(b.similarityscore) - parseFloat(a.similarityscore)
    );
  }

  IssueObject.suggestions = selectedprecautions;
  IssueObject.suggestionsScore = hasSuggestions;

  console.log(IssueObject);
  return IssueObject;
  console.log("Issue object to save", IssueObject);
  /**location: { latitude: 7.0047, longitude: 79.9541 },
  Issue: 'kadawatha',
  IssueRating: 'medium',
  IssueType: 'medical',
  description: 'kadawatha description',
  _id: new ObjectId("636cb33ed44964d1b5a7cb85") */

  // const date = new Date();

  // console.log(
  //   "IssueType : " +
  //     ObjectIssue.IssueType +
  //     "IssueRating: " +
  //     ObjectIssue.IssueRating +
  //     "Location : " +
  //     ObjectIssue.location +
  //     "today is :" +
  //     date
  // );

  // console.log("Precautions", precautions);

  // var start = moment("2018-03-10", "YYYY-MM-DD");
  // var end = moment("2018-03-15", "YYYY-MM-DD");

  // //Difference in number of days
  // const diff = Math.abs(moment.duration(start.diff(end)).asDays());

  // console.log(diff + " difference between days");

  // const distanceScore = await getDistance();
}

async function getDistance(destination, origin) {
  let result = await client.distancematrix({
    params: {
      key: process.env.GOOGLE_API_URL,
      origins: [origin],
      destinations: [destination],
    },
  });
  if (result.data.rows[0].elements[0].status == "ZERO_RESULTS") {
    return 1000000000;
  } else {
    return result.data.rows[0].elements[0].distance.value;
  }
}

module.exports = { getSuggestionsforIssue };
