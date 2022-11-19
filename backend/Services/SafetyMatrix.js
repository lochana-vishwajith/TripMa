require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
var polyline = require("@googlemaps/polyline-codec");
const { PointScore } = require("./PointScore");

const SELECTION_CRITERIA_APPROX_DISTANCE = 1;
class SafeRoute {
  allRouteCordinates = []; //all the cordinates belongs to the route.
  selectedCordinates = []; //cordinates which are selected to the distance matrix.
  client;
  result = [];
  road_total_indexes = 0;
  road_critical_index = 0;
  road_travel_index = 0;
  road_Accomadation_index = 0;

  /**constructor initiate route cordinates from the post method */
  constructor(routeCordinates) {
    this.allRouteCordinates = routeCordinates;
    console.log("constructor called");
  }

  /**This method is to changing the format of the points into lat long format  */
  ChangeFormat() {
    let formatChangedCordinates = [];
    for (let i = 0; i < this.allRouteCordinates.length; i++) {
      formatChangedCordinates.push({
        lat: this.allRouteCordinates[i].latitude,
        lng: this.allRouteCordinates[i].longitude,
      });
    }
    this.allRouteCordinates = formatChangedCordinates;
    //console.log(this.allRouteCordinates); print all cordinates
  }

  /**This method is to select the considered points of the RouteSafety Index  */
  CreateSelectedCordinatesArray() {
    for (
      let i = 0;
      i < this.allRouteCordinates.length;
      i += SELECTION_CRITERIA_APPROX_DISTANCE
    ) {
      this.selectedCordinates.push(this.allRouteCordinates[i]);
    }
    // console.log(this.selectedCordinates); //print selected cordinates
  }

  /**This Method is to Initialize Point objects From the selected List*/
  async CreateUnitCordinateOBj() {
    for (let i = 0; i < this.selectedCordinates.length; i++) {
      let point = this.selectedCordinates[i];
      const selectedUnitCordinate = new PointScore(point);
      let pointscore = await selectedUnitCordinate.mainExecutionFlow();

      //console.log("finished point iobj" + pointscore.ai);
      let pointSafety = {
        cordinate: this.selectedCordinates[i],
        attributes: pointscore,
      };
      this.result.push(pointSafety);
    }
  }

  async Calculate_Road_Indexes() {
    let sumindex = 0;
    for (let j = 0; j < this.result.length; j++) {
      sumindex++;
      this.road_total_indexes =
        this.road_total_indexes +
        this.result[j].attributes.point_total_quality_index;

      this.road_Accomadation_index =
        this.road_Accomadation_index +
        this.result[j].attributes.point_accomadation_index;

      this.road_critical_index =
        this.road_critical_index +
        this.result[j].attributes.point_critical_safety_index;

      this.road_travel_index =
        this.road_travel_index +
        this.result[j].attributes.point_travel_safety_index;

      console.log(
        "total" + this.result[j].attributes.point_total_quality_index
      );
    }
    this.road_critical_index = this.road_critical_index / sumindex;
    this.road_total_indexes = this.road_total_indexes / sumindex;
    this.road_Accomadation_index = this.road_Accomadation_index / sumindex;
    this.road_travel_index = this.road_travel_index / sumindex;
  }

  /**Main method to execute the methods in the Correct order*/
  async startCalculatingMatrix() {
    this.ChangeFormat();
    this.CreateSelectedCordinatesArray();
    await this.CreateUnitCordinateOBj();
    await this.Calculate_Road_Indexes();

    console.log("finished sartatcalmatrix");

    const retobj = {
      roaddatails: {
        totalIndex: this.road_total_indexes,
        criticalindex: this.road_critical_index,
        travelIndex: this.road_travel_index,
        accomadationindex: this.road_Accomadation_index,
      },
      pointsdetails: this.result,
    };

    return retobj;
  }
}

module.exports = {
  SafeRoute,
};
