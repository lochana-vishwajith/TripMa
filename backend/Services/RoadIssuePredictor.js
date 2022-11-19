require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
var polyline = require("@googlemaps/polyline-codec");

const client = new Client({});
const LiveIssue = require("../Models/LiveIssueModel");

const SELECTION_CRITERIA_APPROX_DISTANCE = 20;
async function nearbyIssueCountRoute(routecords) {
  let issue_list = [];
  for (
    let i = 0;
    i < routecords.length;
    i += SELECTION_CRITERIA_APPROX_DISTANCE
  ) {
    let issues = await getIssues(routecords[i]);
    if (issues.length > 0) {
      console.log(routecords[i], "awaaa" + i);
      console.log(issues);
      console.log(routecords[i], "mmm");
      issue_list = [...issue_list, ...issues];
    }
  }
  let issue_list_n = issue_list.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.location.latitude === value.location.latitude &&
          t.location.longitude === value.location.longitude
      )
  );
  return issue_list_n;
  // console.log(this.selectedCordinates); //print selected cordinates
}

// async function ChangeFormat(use_cords) {
//   let formatChangedCordinates = [];
//   for (let i = 0; i < use_cords.length; i++) {
//     formatChangedCordinates.push({
//       lat: use_cords[i].latitude,
//       lng: use_cords[i].longitude,
//     });
//   }
//   getNearBy_issues(formatChangedCordinates) ;

// }

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

module.exports = { getIssues, getDistance, nearbyIssueCountRoute };
