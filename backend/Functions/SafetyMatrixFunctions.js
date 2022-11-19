const { Client } = require("@googlemaps/google-maps-services-js");
const {
  textSearch,
} = require("@googlemaps/google-maps-services-js/dist/places/textsearch");
var polyline = require("@googlemaps/polyline-codec");

const client = new Client({}); //initializing client object


const ArrayObj = [
   {
    "latitude": 7.29019,
    "longitude": 80.63384,
  },
   {
    "latitude": 7.28952,
    "longitude": 80.63279,
  }]


const poly = "uznk@oxckNdCpEwHuAiD_BaDj@mAhAsIaDuCkAyLOoOiEcENkNpGkOIsC{E}@mGgIuCyPbR_QlQaMpFeJbBoEIwAhEyGnNoAvFtA~CoGpJ}GdLuBtNwEfYE`E|BnC|@jE|JrI|CdQd@jFkLdUuSd]z@`Kt@zPyDjDy@bIbBlIoGjNh@zV~B~KrC`Fw@rB}@xH{ErJyJpRuUnb@iPx[gKt^wI|O{LvNeX~\\}PlKcIbEeHdG{OzLuJdCqBbCqQhKiEpIiQ|NqKrJsIfDsMdN}BfA}HwA_EtEPlD_AfFsU`I_FIcBfCcG?oJnBaF`CsEzBuKx@mHq@iJnAmF~@qAdEmD`KgExMkJdNyIhKoNnc@q\\fp@k[ls@im@`rAgn@hqAgFvWuJzN}L~PcSb`@mL`VmErPcPtVkHvC}IvNaTpOuI~KgQ`RyO~YkGfNoP`NkItI_LtEqLlBeBlBvArFdDjSDxTy@rD}FrDcWrHqIzJoQx_@i_@|y@hJnUi@~EdCpBvIr@rDpCdEfOfKhF|j@tKhZdMxPpNl[fk@p_@bv@fGv_@hH`y@`Vhx@vWh{@~OzbAdKnTtQjUf\\``@tj@|z@nw@~tAld@bt@lWtT~\\`b@zPrj@|Dpp@jMjm@zFpr@Szi@xFv]jVrg@t\\xn@zc@t\\dYz_@h]n_@|o@tXjfDjrAbh@`Vxb@hVzb@vOrg@lElWtFn`@pVjZlVrRlLhV~E~]xN|VrObTpFxSbCrPp@xGkCvFeLlFYbKpCvF~IjHpDbBNlLlFnVrLd@tX|Bx]bJvOjRbm@rWdaB`Fba@iAtZhEnWzGxVrJ~JpC`QR`QxHr[zKlNnGdRcCzOpGxb@Lle@|Ahe@r@lFwCzKo@jNtAnVvCdL~Cth@AhE|j@rd@t^`d@rm@pp@d\\~\\~S`WnFvSnExX|[nr@j]h|@bO|YdWjWdh@hWlEdGlCtMzBrEWzCJfF}@rEi@pDgBdOGxJeEhMmFx\\^vIqCnPsM`d@yT|RmM~Ya\\xgAaJzf@fBzFhCtAxYr@fSzL~p@ph@p[~Yhd@t^jPdNvEdJrExOhJpEhr@pIf_@cBtg@}Oxt@aLpv@sPf~@aNbu@Lxj@wB|bAjCts@sCjiBuIry@gRnuA}c@~a@yEfb@s@zn@oEvXeJtIqPfEaYxMeQfQsGx[p@b_@fJfNbKpKrDnQh@dUStNjInQ|Q`WpCjTzFj`@tZtm@~d@bO~LjNjGzGExK\\pTXbLFJhEdEjKnPnLzEzFbDxb@vMlEdIb@jHzDvAs@bCtIfCnCL?LVQhB"


function findPoints(poly) {
  let poly = poly;
  list = polyline.decode(poly, 5);
  console.log(list.length);
  console.log(list);
  console.log(poly);

  console.log(JSON.stringify(response.data.routes[0].legs[0].distance.value));
  getlist(list);
}

function getlist(list) {
  let nlist = [];
  for (let i = 1; i < list.length; i += 20) {
    nlist.push(list[i]);
  }
  console.log(nlist.length);
  createCordinateOBj(nlist);
}

function createCordinateOBj(unitlocations) {
  let waypoints = [];
  for (let i = 0; i < unitlocations.length; i++) {
    waypoints.push({ lat: unitlocations[i][0], lng: unitlocations[i][1] });
  }
  console.log(waypoints);
  waypoints.forEach((point) => {
    console.log(point);
    SearchNearby(point);
  });
}

function SearchNearby(point) {
  client
    .textSearch({
      params: {
        key: "AIzaSyDtglHVtsnKKbouEmSJR0uh05H-kSFFO9g",
        query: ["police", "hospital"],
        location: point,
        distance: "distance",
        language: "en",
        formatted_phone_number: true,
      },
    })
    .then((response) => {
      //console.log(response.data.results.length);
      //console.log("just data" + response.data);
      console.log(response.data.results);

      //console.log(response.data.results[0].geometry.location);
      selectType(response.data.results);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

function selectType(nearbyObj) {
  let nearBylocations = nearbyObj;
  //console.log(locations);

  let hospitals = [];
  let polices = [];

  for (let i = 0; i < nearBylocations.length; i++) {
    if (nearBylocations[i].types.length > 0) {
      for (let j = 0; j < nearBylocations[i].types.length; j++) {
        if (nearBylocations[i].types[j].match("hospital")) {
          hospitals.push(nearBylocations[i]);
        } else if (nearBylocations[i].types[j].match("police")) {
          polices.push(nearBylocations[i]);
        }
      }
    }
  }

  console.log("-------hospitals---------");
  console.log(nearesthospital);

  let getdistobj = [];

  if (nearesthospital > 0) {
    let nearesthospital = {
      cord: hospitals[0].geometry.location,
      obj: hospitals[0],
      type: "hospital",
    };
    getdistobj.add(nearesthospital);
  }

  console.log("-------polices---------");
  console.log(nearestpolice);
  if (nearestpolice > 0) {
    let nearestpolice = {
      cord: polices[0].geometry.location,
      obj: polices[0],
      type: "police",
    };
    getdistobj.add(nearestpolice);
  }
  getDistance(getdistobj);
}

function getDistance(getDistobj, originpoint) {
  let cordinatesArray = [];

  for (let c = 0; c < getDistobj.length; c++) {
    cordinatesArray.add(getDistobj[c].cord);
  }
  client
    .distancematrix({
      params: {
        key: "AIzaSyDtglHVtsnKKbouEmSJR0uh05H-kSFFO9g",
        origins: [originpoint],
        destinations: cordinatesArray,
      },
    })
    .then((result) => {
      console.log(result.data.rows[0].elements);
      for (let i = 0; i < result.data.rows[0].elements.length; i++) {
        console.log(result.data.rows[0].elements[i]);
      }
    })
    .catch((err) => {
      console.log(err.response.data.error_message);
    });
}

function calculateSafetyIndex(sensitivedistancematrix) {}
