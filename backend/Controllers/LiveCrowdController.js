const LiveCrowd = require("../Models/LiveCrowdModel");

const {
  liveNearbyAnalyzer,
} = require("../Services/LiveNearbyAnalyzeService");

const {
  lessThanOneHourAgo,
} = require("../Services/TimeFilterService");

const {
  crowdScore,
} = require("../Services/CrowdScoreService");

const {
  currentWeather,hourlyWeather,
} = require("../Services/WeatherAPIService");

const {
  weatherScore,
} = require("../Services/WeatherScoreService");

const {
  openStatus,visitNow
} = require("../Services/OpenStatusService");

const {
  TotalScore
} = require("../Services/BestTimeAnalyzerService");
const { futurecrowdScore } = require("../Services/FutureCrowdScoreService");
const { RouteService } = require("../Services/AttractionRouteService");

const addLiveCrowd = async (req, res) => {
  const { location,
    date,
    crowd,
    openStatus,
    weather,
    visit,
    placeType } = req.body;

  try {
    const liveCrowd = LiveCrowd({
      location,
      date,
      crowd,
      openStatus,
      weather,
      visit,
      placeType
    });

    await liveCrowd
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send(err);
  }
};

const getLiveCrowd = async (req, res) => {
  try {
    await LiveCrowd.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getNearbyUpdates = async (req, res) => {
  console.log("Invoking nearbyupdates");
  const {selectedLat,selectedLng,crowdPref,weatherPref} = req.params;
  console.log("URL Lat lng",selectedLat,selectedLng," ",crowdPref," ",weatherPref);
  try {
    await LiveCrowd.find().then(async (result) => {
      const nearByUpdates = await liveNearbyAnalyzer(result,selectedLat,selectedLng);
      // const futureCrowd = await futurecrowdScore(nearByUpdates);
      const timeFilteredData = await lessThanOneHourAgo(nearByUpdates);
      const crowdUpdate = await crowdScore(nearByUpdates);
      const currentWeatherUpdate = await currentWeather(selectedLat,selectedLng);
      // const hourlyWeatherUpdate = await hourlyWeather(selectedLat,selectedLng);
      const weatherScoreData = await weatherScore(nearByUpdates,currentWeatherUpdate);
      const openData = await openStatus(nearByUpdates);
      const visitData = await visitNow(nearByUpdates);
      const finalPrediction = await TotalScore(crowdPref,weatherPref,crowdUpdate,weatherScoreData,openData,visitData);
      // console.log("Final: ",finalPrediction);
      res.status(200).send(finalPrediction);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getFutureCrowd = async (req, res) => {
  console.log("Invoking Future Updates");
  const {Lat,Lng} = req.params;
  console.log("URL Lat lng",Lat,Lng);
  try {
    await LiveCrowd.find().then(async(result) => {
      const nearByUpdates = await liveNearbyAnalyzer(result,Lat,Lng);
      const dateTimeSplit = await futurecrowdScore(nearByUpdates);
      res.status(200).send(dateTimeSplit);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getRoute = async (req,res) =>{
  console.log("Invoking Routes");
  const data = req.body;
  const {crowdPref,weatherPref} = req.params;
  try {
    await LiveCrowd.find().then(async(result) => {
      // const route = await RouteService(data,result,crowdPref,weatherPref);
      // const nearByUpdates = await liveNearbyAnalyzer(result,Lat,Lng);
      // const dateTimeSplit = await futurecrowdScore(result);
      res.status(200).send(dateTimeSplit);
    });
    
  } catch (error) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
}

module.exports = { addLiveCrowd, getLiveCrowd, getNearbyUpdates,getFutureCrowd,getRoute };
