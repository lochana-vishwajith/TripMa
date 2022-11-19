require("dotenv").config();
const axios = require("axios");

const KEY = process.env.GOOGLE_API_URL;

const liveNearbyAnalyzer = (update, selectedLat, selectedLng) => {
  console.log("Invoking liveNearbyAnalyzer service");
  return new Promise(async (resolve, reject) => {
    try {
      let nearbyPlaces = [];
      let dataWithLocations = [];
      let distance;
      update.forEach((element) => {});

      for (let i = 0; i < update.length; i++) {
        const ORIGIN_LATITUDE = update[i].location.lat;
        const ORIGIN_LONGITUDE = update[i].location.lng;
        // console.log("ORIGIN_LAT: ", ORIGIN_LATITUDE, selectedLat, selectedLng);
        // const element = array[i];
        if (ORIGIN_LATITUDE === undefined) {
          console.log("Undifined Location data: ",update[i]);
        } else {
          const GOOGLE_DISTANCE_MATRIX_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ORIGIN_LATITUDE},${ORIGIN_LONGITUDE}&destinations=${selectedLat},${selectedLng}&key=${KEY}`;
          // console.log("GOOGLE URL: ", GOOGLE_DISTANCE_MATRIX_URL);
          const result = await axios.get(GOOGLE_DISTANCE_MATRIX_URL);
          // console.log("Distant", JSON.stringify(result.data.rows[0]));
          // distance=result.data.rows[0];
          if (result.data.rows[0].elements[0].distance.value <= 500) {
            // console.log("Selected places: ", update[i]);
            nearbyPlaces.push(update[i]);
          }
        }
      }
      // console.log("Nearby Locations: ", nearbyPlaces);
      // console.log("Distance: ", distance);
      return resolve(nearbyPlaces);
      // return nearbyPlaces;
    } catch (error) {
      console.log("Failed to generate distances:" + JSON.stringify(error));
      reject();
    }
  });
};

module.exports = { liveNearbyAnalyzer };
