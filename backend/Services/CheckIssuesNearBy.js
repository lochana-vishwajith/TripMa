require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
var polyline = require("@googlemaps/polyline-codec");

const client = new Client({});
const LiveIssue = require("../Models/LiveIssueModel");

async function getIssues(origin) {
  let issues = [];
  let nearby_issues = [];
  issues = await LiveIssue.find();

  for (let i = 0; i < issues.length; i++) {
    console.log(issues[i].location.latitude + "lat");
    console.log(issues[i].location.longitude + "long");
    if (issues[i].location.latitude && issues[i].location.longitude) {
      let distance = await getDistance(issues[i].location, origin);
      console.log(distance);
      if (distance <= 10000) {
        issues[i].distance = distance;
        let obj = {
          distance: distance,
          Issue: issues[i].Issue,
          IssueType: issues[i].IssueType,
          description: issues[i].description,
          location: issues[i].location,
          date: issues[i].date,
          isUserAccept: issues[i].isUserAccept,
          useracceptSuggestion: issues[i].useracceptSuggestion,
          useracceptPrecaution: issues[i].useracceptPrecaution,
          userComments: issues[i].userComments,
          time: issues[i].time,
          address: issues[i].address,
        };
        nearby_issues.push(obj);
      }
    }
  }
  if (nearby_issues.length > 0) {
    nearby_issues.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  return nearby_issues;
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

module.exports = { getIssues, getDistance };
