//const map = require("@googlemaps/google-maps-services-js");
require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");

const client = new Client({}); //initializing client object

async function call(location, objs) {
  let gas_stationObj = await getAllNearByPlaces("gas_stations", location);
  gas_stationObj.type = "gas_station";
  let hospitalObj = await getAllNearByPlaces("hospital", location);
  hospitalObj.type = "hospital";
  let pharmacyObj = await getAllNearByPlaces("pharmacy", location);
  pharmacyObj.type = "pharmacy";
  let resturantObj = await getAllNearByPlaces("restaurant", location);
  resturantObj.type = "restaurant";
  let taxi_standObj = await getAllNearByPlaces("taxi_stand", location);
  taxi_standObj.type = "taxi_stand";
  let policeObj = await getAllNearByPlaces("police", location);
  policeObj.type = "police";
  let train_stationObj = await getAllNearByPlaces("train_stations", location);
  train_stationObj.type = "train_station";
  let bus_stationObj = await getAllNearByPlaces("bus_station", location);
  bus_stationObj.type = "bus_station";

  let scoreobjects = {
    gas_stationObj,
    hospitalObj,
    pharmacyObj,
    resturantObj,
    taxi_standObj,
    policeObj,
    train_stationObj,
    bus_stationObj,
  };

  let matrix = await CalculatequalityIndex(scoreobjects, objs);

  scoreobjects.matrix = matrix;

  return scoreobjects;
}

async function getAllNearByPlaces(query, location) {
  let placesResult = await client.textSearch({
    params: {
      key: process.env.GOOGLE_API_URL,
      query: query,
      location: location,
      radius: 1000,
    },
  });

  places = placesResult.data.results;

  let retobj = await getDistanceLoop(places, location, query);
  return retobj;
}

async function getDistanceLoop(destination, origin, query) {
  reobj = [];
  if (query == "gas_stations") {
    query = "gas_station";
  }
  if (query == "train_stations") {
    query = "train_stations";
  }
  for (let i = 0; i < destination.length; i++) {
    if (places[i].types.includes(query) && places[i].rating > 2.5) {
      let dist = await getDistance(places[i].geometry.location, origin);
      places[i].distance = dist;
      if (dist < 20000) {
        reobj.push(places[i]);
      }
    }
  }

  if (reobj.length > 0) {
    reobj.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  if (reobj[0]) {
    reobj.distanceScore = calculateDistanceScore(reobj[0]);
  } else {
    reobj.distanceScore = 0;
  }
  return reobj;
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
    //Since google api returns zero results when the distance is greater than 10000
    return 10000000;
  }
  return result.data.rows[0].elements[0].distance.value;
}

function calculateDistanceScore(nearestPlace) {
  // console.log(" calculateDistanceScore");
  let distance = nearestPlace.distance;
  let score;
  if (distance >= 10000) {
    score = 0;
  } else {
    score = Math.floor(distance / 1000); //to get in km
    score = 10 - score;
  }
  return score;
}

async function CalculatequalityIndex(retObjs, objs) {
  console.log("meka awa");
  let Matrix = {
    hospital: 0,
    police: 0,
    pharmacy: 0,
    bus_station: 0,
    gas_station: 0,
    railway_station: 0,
    taxi_station: 0,
    resturant: 0,
  };

  Matrix.hospital = objs.hospitaldefScore * retObjs.hospitalObj.distanceScore;

  Matrix.police = objs.policedefScore * retObjs.policeObj.distanceScore;
  Matrix.pharmacy = objs.pharmacydefScore * retObjs.pharmacyObj.distanceScore;
  Matrix.bus_station =
    objs.buststanddefscore * retObjs.bus_stationObj.distanceScore;
  Matrix.gas_station =
    objs.gasstationdefScore * retObjs.gas_stationObj.distanceScore;
  Matrix.railway_station =
    objs.railwaydefScore * retObjs.train_stationObj.distanceScore;
  Matrix.taxi_station =
    objs.taxistanddefScore * retObjs.taxi_standObj.distanceScore;
  Matrix.resturant =
    objs.resturantdefScore * retObjs.resturantObj.distanceScore;

  healthscore =
    (Matrix.hospital + Matrix.pharmacy) /
    (objs.hospitaldefScore + objs.pharmacydefScore);
  securityScore = Matrix.police / objs.policedefScore;
  transportScore =
    (Matrix.bus_station + Matrix.railway_station + Matrix.taxi_station) /
    (objs.buststanddefscore + objs.railwaydefScore + objs.taxistanddefScore);
  infastructureScore =
    (Matrix.resturant + Matrix.gas_station) /
    (objs.resturantdefScore + objs.gasstationdefScore);

  let total_index =
    (Matrix.hospital +
      Matrix.pharmacy +
      Matrix.police +
      Matrix.bus_station +
      Matrix.railway_station +
      Matrix.taxi_station +
      Matrix.resturant +
      Matrix.gas_station) /
    (objs.hospitaldefScore +
      objs.pharmacydefScore +
      objs.policedefScore +
      objs.buststanddefscore +
      objs.railwaydefScore +
      objs.taxistanddefScore +
      objs.resturantdefScore +
      objs.gasstationdefScore);

  let IndexMatrix = {
    total: total_index,
    health: healthscore,
    transport: transportScore,
    security: securityScore,
    infastructure: infastructureScore,
  };

  if (IndexMatrix.total > 7) {
    IndexMatrix.colorzone = "green";
  } else if (IndexMatrix.total < 7 && IndexMatrix.total > 3) {
    IndexMatrix.colorzone = "yellow";
  } else if (IndexMatrix.total <= 3) {
    IndexMatrix.colorzone = "red";
  }

  return IndexMatrix;
}

module.exports = {
  call,
  CalculatequalityIndex,
  getAllNearByPlaces,
  getDistance,
  calculateDistanceScore,
  getDistanceLoop,
};
