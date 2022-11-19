const TotalScore = (
  crowdPreference,
  weatherPreference,
  crowdScoreData,
  weatherScoreData,
  statusScoreData,
  visitScoreData
) => {
  return new Promise(async (resovle, reject) => {
    try {
      const USERCROWDPREFERENCE = crowdPreference;
      const USERWEATHERPREFERENCE = weatherPreference;

      const CROWDSCORE = crowdScoreData.crowdScore;
      const WEATHERSCORE = weatherScoreData.weatherScore;
      const STATUSSCORE = statusScoreData.statusScore;
      const VISITSCORE = visitScoreData.vistAnalysis;
      let TOTALSCORE = 0;
      let finalCrowdPercentage = 0;
      let finalWeatherPercentage = 0;

      if(CROWDSCORE * USERCROWDPREFERENCE >= 0.7){
        finalCrowdPercentage = 50;
      }else if(CROWDSCORE * USERCROWDPREFERENCE > 0.5 && CROWDSCORE * USERCROWDPREFERENCE < 0.7){
        finalCrowdPercentage = 30;
      }else{
        finalCrowdPercentage = 15;
      }

      if(weatherScoreData.placeType == "INDOOR"){
        finalWeatherPercentage = 45;
      }else if(weatherScoreData.placeType == "OUTDOOR"){
        if(USERWEATHERPREFERENCE < 3 && WEATHERSCORE <= 0.3 || USERWEATHERPREFERENCE > 3 && WEATHERSCORE > 0.3){
            finalWeatherPercentage = 50;
        }else if(USERWEATHERPREFERENCE == 3 && WEATHERSCORE >= 0.3){
            finalWeatherPercentage = 35;
        }else if(USERWEATHERPREFERENCE == 3 && WEATHERSCORE < 0.3){
            finalWeatherPercentage = 15;
        }else if(USERWEATHERPREFERENCE > 3 && WEATHERSCORE <= 0.3){
            finalWeatherPercentage = 15;
        }
      }

      TOTALSCORE = (finalCrowdPercentage + finalWeatherPercentage)*STATUSSCORE*VISITSCORE;

      const bestTime ={
        totalScore: TOTALSCORE,
        crowd: crowdScoreData.crowdAnalysis,
        weather: weatherScoreData.CompairedResult,
        totalData: crowdScoreData.totalCrowd,
        status: statusScoreData.statusAnalysis,
        visitYes: visitScoreData.yes,
        visitNo: visitScoreData.no
      }

      // console.log("BestTime Prediction: ",bestTime);
      resovle(bestTime);

    } catch (error) {
        console.log(error);
        reject();
    }
  });
};

module.exports = { TotalScore };
