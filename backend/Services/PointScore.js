require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
const {
  placesnearby,
} = require("@googlemaps/google-maps-services-js/dist/places/placesnearby");
var polyline = require("@googlemaps/polyline-codec");

const CRITICAL_SAFETY__WEIGHT_MEDICAL = 0.6;
const CRITICAL_SAFETY__WEIGHT_POLICE = 0.4;

const CRITICAL_SAFETY__WEIGHT_SUB_MEDICAL_HOSPITAL = 0.8;
const CRITICAL_SAFETY__WEIGHT_SUB_MEDICAL_PHARMACY = 0.2;

const TRAVELLING_SAFETY__WEIGHT_TRAVEL = 0.8;
const TRAVELLING_SAFETY__WEIGHT_INFASTRUCTURE = 0.2;

const TRAVELLING_SAFETY__WEIGHT__BUS_STAND = 0.7;
//const TRAVELLING_SAFETY__WEIGHT__RAILWAY = 0.1;
const TRAVELLING_SAFETY__WEIGHT__TAXISTAND = 0.3;

const ACCOMADATION_SAFETY__WEIGHT_RESTURANT = 1;

const CRITICAL_SAFETY_INDEX_WEIGHT = 0.6;
const TRAVELLING_SAFETY_INDEX_WEIGHT = 0.3;
const ACCOMADATION_SAFETY_INDEX_WEIGHT = 0.1;

class PointScore {
  nearestPlaces = [];
  originCordinate;
  query = ["police"];
  bus_stations = [];
  car_rentals = [];
  gas_stations = [];
  hospitals = [];
  pharmacies = [];
  restaurants = [];
  taxi_stands = [];
  cities = [];
  colorzone = "none";

  hospitals = [];
  polices = [];
  train_stations = [];
  nextPlaceToken; // to capture weather next token is available
  client;
  hospitalsNearBy = [];
  availablescoringobj = [];

  suggestionsListForPoint = [];

  criticalSafetyIndex = 0; //6
  AccomadationIndex = 0; //accomadations and restrooms//1
  travellingSafetyIndex = 0; //3

  constructor(point) {
    this.client = new Client({});
    console.log("constructor called");
    this.originCordinate = point;
  }

  /**Function to Retrieve the nearest places */
  async getAllNearByPlaces(query) {
    let placesResult = await this.client.textSearch({
      params: {
        key: process.env.GOOGLE_API_URL,
        query: query,
        location: this.originCordinate,
        distance: true,
      },
    });
    this.pagetoken = placesResult.data.next_page_token;
    this.nearestPlaces.push(...placesResult.data.results);
  }

  /** Check weather there is any next page tokens and if so called the next page*/

  // /**check wheather there is any more pages available */
  async getNextPagePlaces(query) {
    console.log("nextplace query");
    await this.delay(2000);
    let result = await this.client.placesnearby({
      params: {
        key: process.env.GOOGLE_API_URL,
        query: query,
        location: this.originCordinate,
        distance: true,
        pagetoken: this.nextPlaceToken,
      },
    });
    let res = result.data;
    await this.delay(2000);
    this.nearestPlaces.push(...res.results);

    if (res.next_page_token) {
      this.nextPlaceToken = res.next_page_token;
      await this.delay(1000);
      await this.getNextPagePlaces();
    } else {
      this.getNextPagePlaces = null;
    }

    return 0;
  }

  /**Selecting the Type Accordingly*/
  async SelectType() {
    let nearBylocations = this.nearestPlaces;
    for (let i = 0; i < nearBylocations.length; i++) {
      if (nearBylocations[i].types.length > 0) {
        for (let j = 0; j < nearBylocations[i].types.length; j++) {
          if (nearBylocations[i].types[j].match("hospital")) {
            nearBylocations[i].type = "hospital";
            this.hospitals.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("police")) {
            nearBylocations[i].type = "police";
            this.polices.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("bus_station")) {
            nearBylocations[i].type = "bus_station";
            this.bus_stations.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("gas_station")) {
            nearBylocations[i].type = "gas_station";
            this.gas_stations.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("pharmacy")) {
            nearBylocations[i].type = "pharmacy";
            this.pharmacies.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("restaurant")) {
            nearBylocations[i].type = "restaurant";
            this.restaurants.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("taxi_stand")) {
            nearBylocations[i].type = "taxi_stand";
            this.taxi_stands.push(nearBylocations[i]);
          } else if (nearBylocations[i].types[j].match("train_station")) {
            nearBylocations[i].type = "train_station";
            this.train_stations.push(nearBylocations[i]);
          }
        }
      }
    }
  }
  /**function to delay the execution by 2000ms */
  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async mainExecutionFlow() {
    await this.getAllNearByPlaces("hospital");
    await this.getAllNearByPlaces("police");
    await this.getAllNearByPlaces("resturant");
    await this.getAllNearByPlaces("gas_station");
    await this.getAllNearByPlaces("bus_station");
    await this.getAllNearByPlaces("pharmacy");
    await this.getAllNearByPlaces("taxi_stand");

    if (this.nextPlaceToken) {
      await this.getNextPagePlaces();
    }
    await this.SelectType();
    await this.getAvailablenearestPlaces();
    console.log(this.availablescoringobj);
    await this.calculate_Quality_Matrix();
    await this.CalculateTotalqualityIndexRoute();

    await this.checkzoneColor(this.total_quality_index);

    return await {
      point_total_quality_index: this.total_quality_index,
      point_critical_safety_index: this.criticalSafetyIndex,
      point_travel_safety_index: this.travellingSafetyIndex,
      point_accomadation_index: this.AccomadationIndex,
      obj: this.availablescoringobj,
      point_suggestions: this.suggestionsListForPoint,
      colorzone: this.colorzone,
    };
  }

  async checkzoneColor(index) {
    if (index > 5) {
      this.colorzone = "green";
    } else if (index < 5 && index > 3) {
      this.colorzone = "yellow";
    } else if (index < 3) {
      this.colorzone = "red";
    }
  }

  async getAvailablenearestPlaces() {
    console.log("getAvailablenearestPlaces");
    if (this.hospitals.length > 0) {
      let nearesthospital = await this.getClosestPlace(this.hospitals);
      nearesthospital.score = await this.calculateDistanceScore(
        nearesthospital
      );
      this.availablescoringobj.push(nearesthospital);
    }
    if (this.polices.length > 0) {
      let nearestpolice = await this.getClosestPlace(this.polices);
      nearestpolice.score = await this.calculateDistanceScore(nearestpolice);
      this.availablescoringobj.push(nearestpolice);
    }
    if (this.restaurants.length > 0) {
      let restaurant = await this.getClosestPlace(this.restaurants);
      restaurant.score = await this.calculateDistanceScore(restaurant);
      this.availablescoringobj.push(restaurant);
    }
    if (this.bus_stations.length > 0) {
      let bus_station = await this.getClosestPlace(this.bus_stations);
      bus_station.score = await this.calculateDistanceScore(bus_station);
      this.availablescoringobj.push(bus_station);
    }
    if (this.gas_stations.length > 0) {
      let gas_station = await this.getClosestPlace(this.gas_stations);
      gas_station.score = await this.calculateDistanceScore(gas_station);
      this.availablescoringobj.push(gas_station);
    }
    if (this.pharmacies.length > 0) {
      let pharmacy = await this.getClosestPlace(this.pharmacies);
      pharmacy.score = await this.calculateDistanceScore(pharmacy);
      this.availablescoringobj.push(pharmacy);
    }
    if (this.taxi_stands.length > 0) {
      let taxi_stand = await this.getClosestPlace(this.taxi_stands);
      taxi_stand.score = await this.calculateDistanceScore(taxi_stand);
      this.availablescoringobj.push(taxi_stand);
    }
    if (this.train_stations.length > 0) {
      let train_station = await this.getClosestPlace(this.train_stations);
      train_station.score = await this.calculateDistanceScore(train_station);
      this.availablescoringobj.push(train_station);
    }
    // return this.availablescoringobj;
  }

  async getDistance(destination) {
    let result = await this.client.distancematrix({
      params: {
        key: process.env.GOOGLE_API_URL,
        origins: [this.originCordinate],
        destinations: [destination],
      },
    });

    if (result.data.rows[0].elements[0].status == "ZERO_RESULTS") {
      //Since google api returns zero results when the distance is greater than 10000
      return 10000000;
    }
    return result.data.rows[0].elements[0].distance.value;
  }

  /**Getting the closest place out of near by places */
  async getClosestPlace(typeofPlaceArr) {
    console.log("finished execution getClosestPlace");
    let minDistancePlace = typeofPlaceArr[0];
    let minDistance = await this.getDistance(
      typeofPlaceArr[0].geometry.location
    );
    for (let place of typeofPlaceArr) {
      let distance = await this.getDistance(place.geometry.location);
      place.distance = distance;
      if (distance < 10000) {
        this.hospitalsNearBy.push(place);
      }
      if (distance < minDistance) {
        minDistance = distance;

        minDistancePlace = place;
      }
    }

    return minDistancePlace;
  }

  calculateDistanceScore(nearestPlace) {
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

  calculate_Quality_Matrix() {
    console.log("  calculate_Quality_Matrix");
    this.availablescoringobj.forEach((element) => {
      if (element.type.match("hospital")) {
        this.CalculateCriticalSafetyIndex("hospital", element.score);
      } else if (element.type.match("police")) {
        this.CalculateCriticalSafetyIndex("police", element.score);
      } else if (element.type.match("bus_station")) {
        this.CalculateTravelSafetyIndex("bus_station", element.score);
      } else if (element.type.match("gas_station")) {
        this.CalculateTravelSafetyIndex("gas_station", element.score);
      } else if (element.type.match("pharmacy")) {
        this.CalculateCriticalSafetyIndex("pharmacy", element.score);
      } else if (element.type.match("restaurant")) {
        this.CalculateAccormadationSafetyIndex(element.score);
      } else if (element.type.match("taxi_stand")) {
        this.CalculateTravelSafetyIndex("taxi_stand", element.score);
      } else if (element.type.match("train_station")) {
        this.CalculateTravelSafetyIndex("train_station", element.score);
      }
    });
  }
  CalculateTotalqualityIndexRoute() {
    this.total_quality_index =
      this.criticalSafetyIndex * CRITICAL_SAFETY_INDEX_WEIGHT +
      this.travellingSafetyIndex * TRAVELLING_SAFETY_INDEX_WEIGHT +
      this.AccomadationIndex * ACCOMADATION_SAFETY_INDEX_WEIGHT;
  }

  CalculateCriticalSafetyIndex(type, score) {
    if (type == "police") {
      this.criticalSafetyIndex =
        this.criticalSafetyIndex + score * CRITICAL_SAFETY__WEIGHT_POLICE;

      if (score < 3) {
        this.suggestionsListForPoint.push({
          police:
            "There is less police stations near by please do concern on your security",
        });
      }
    } else {
      if (type == "hospital") {
        this.criticalSafetyIndex =
          this.criticalSafetyIndex +
          score *
            CRITICAL_SAFETY__WEIGHT_MEDICAL *
            CRITICAL_SAFETY__WEIGHT_SUB_MEDICAL_HOSPITAL;

        if (score < 3) {
          this.suggestionsListForPoint.push("There is less hospitals around");
        }
      } else if (type == "pharmacy") {
        this.criticalSafetyIndex =
          this.criticalSafetyIndex +
          score *
            CRITICAL_SAFETY__WEIGHT_MEDICAL *
            CRITICAL_SAFETY__WEIGHT_SUB_MEDICAL_PHARMACY;

        if (score < 3) {
          this.suggestionsListForPoint.push(
            "There is less phamacies available please do care to pack necessary medicines beforehand"
          );
        }
      }
    }
  }

  CalculateTravelSafetyIndex(type, score) {
    if (type == "bus_station") {
      this.travellingSafetyIndex =
        this.travellingSafetyIndex +
        score *
          TRAVELLING_SAFETY__WEIGHT_TRAVEL *
          TRAVELLING_SAFETY__WEIGHT__BUS_STAND;
      if (score < 3) {
        this.suggestionsListForPoint.push(
          "There is less bus stands near by please do concern to take private vehicle arrangement"
        );
      }
    } else if (type == "taxi_stand") {
      this.travellingSafetyIndex =
        this.travellingSafetyIndex +
        score *
          TRAVELLING_SAFETY__WEIGHT_TRAVEL *
          TRAVELLING_SAFETY__WEIGHT__TAXISTAND;
      if (score < 3) {
        this.suggestionsListForPoint.push(
          "There is less taxi stands available near by please"
        );
      }
    } else if (type == "train_station") {
      this.travellingSafetyIndex =
        this.travellingSafetyIndex +
        score *
          TRAVELLING_SAFETY__WEIGHT_TRAVEL *
          TRAVELLING_SAFETY__WEIGHT__RAILWAY;

      // if (score < 3) {
      //   this.suggestionsListForPoint = this.suggestionsListForPoint.push();
      // }
    } else if (type == "gas_station") {
      this.travellingSafetyIndex =
        this.travellingSafetyIndex +
        score * TRAVELLING_SAFETY__WEIGHT_INFASTRUCTURE;
      if (score < 3) {
        this.suggestionsListForPoint.push(
          "There is less gas stations near by please concern on your fuels if your using private vehicle"
        );
      }
    }
  }
  CalculateAccormadationSafetyIndex(score) {
    if (score < 3) {
      this.suggestionsListForPoint.push(
        "There is less Accormadations and Restrooms near by please try to book a hotel before you travel"
      );
    }
    this.AccomadationIndex = this.AccomadationIndex + score;
  }
}

module.exports = {
  PointScore,
};
