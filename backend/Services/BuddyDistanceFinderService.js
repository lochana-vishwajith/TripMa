require("dotenv").config();
const axios = require("axios");

const KEY = process.env.GOOGLE_API_URL;

const buddyDistanceFinder = (buddies, userId, requestId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let buddiesWithDistance = [];
      let requestedUser = {};
      let nonReqUser = [];

      buddies.forEach((buddy) => {
        if (buddy.userId.id === userId && requestId === buddy.id) {
          requestedUser = buddy;
        } else if (buddy.userId.id !== userId) {
          nonReqUser.push(buddy);
        }
      });

      const ORIGIN_LATITUDE = JSON.parse(requestedUser.destination).origin
        .latitude;
      const ORIGIN_LONGITUDE = JSON.parse(requestedUser.destination).origin
        .longitude;

      for (let i = 0; i < nonReqUser.length; i++) {
        const GOOGLE_DISTANCE_MATRIX_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ORIGIN_LATITUDE},${ORIGIN_LONGITUDE}&destinations=${
          JSON.parse(nonReqUser[i].destination).origin.latitude
        },${JSON.parse(nonReqUser[i].destination).origin.longitude}&key=${KEY}`;

        const result = await axios.get(GOOGLE_DISTANCE_MATRIX_URL);

        const kms = result.data.rows[0].elements[0].distance.text.split(" ")[0];

        if (kms < 30) {
          const buddyWithDis = {
            requestDetails: nonReqUser[i],
            distanceDetails: JSON.stringify(result.data.rows),
          };
          buddiesWithDistance.push(buddyWithDis);
        }
      }

      return resolve({ buddiesWithDistance, requestedUser });
    } catch (error) {
      console.log("Failed to generate distances:" + JSON.stringify(error));
      reject();
    }
  });
};

module.exports = { buddyDistanceFinder };
