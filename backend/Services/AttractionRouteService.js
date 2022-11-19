const { TotalScore } = require("./BestTimeAnalyzerService");
const { crowdScore } = require("./CrowdScoreService");
const { liveNearbyAnalyzer } = require("./LiveNearbyAnalyzeService");
const { openStatus, visitNow } = require("./OpenStatusService");
const { currentWeather } = require("./WeatherAPIService");
const { weatherScore} = require("./WeatherScoreService");

const RouteService=(dataArray,resultSet,crowdPref,weatherPref)=>{
    console.log("DATA: ",dataArray);
    return new Promise(async (resovle, reject) => {
        console.log("Invoking Attraction Route model");
        try {
            let locations = [];
            let finalData = [];
            locations.push(dataArray.locations);
            // locations.forEach(async(element) => {
            //     console.log("Single ele",element);
            //     const nearbyData = await liveNearbyAnalyzer(resultSet,element.lat,element.lng);
            //     console.log("nearby Route",nearbyData);
            // });
            console.log("locations:",locations);
            for (let index = 0; index < locations[0].length; index++) {
                const nearbyData = await liveNearbyAnalyzer(resultSet,locations[0][index].lat,locations[0][index].lng);
                console.log("nearby Route",nearbyData);
                const crowdAnalyze = await crowdScore(nearbyData);
                const weatherAnalyze = await currentWeather(locations[0][index].lat,locations[0][index].lng);
                const weatherData = await weatherScore(nearbyData,weatherAnalyze);
                const openData = await openStatus(nearbyData);
                const visitData = await visitNow(nearbyData);
                const finalPrediction = await TotalScore(crowdPref,weatherPref,crowdAnalyze,weatherData,openData,visitData);
                finalData.push(...finalPrediction);
                console.log("Final data single:",finalPrediction);
            }

            console.log("Final Array:", finalData);



        } catch (error) {
            console.log(error);
            reject();
        }
    });
}

module.exports = { RouteService };