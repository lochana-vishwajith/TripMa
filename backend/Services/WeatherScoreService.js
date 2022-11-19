const weatherScore = (locationData, currentWeather) => {
  return new Promise(async (resovle, reject) => {
    console.log("Invoking weather score model", locationData);
    try {
      let rain = 0;
      let cloud = 0;
      let sunny = 0;
      let totalData = 0;
      let manualCalculation;
      let comparedResult;
      let weatherScore = 0;
      let indoor = 0;
      let outdoor = 0;
      let totalPlaceType = 0;
      let placeType;

      locationData.forEach((element) => {
        // console.log("data set weather: ", element.weather);
        if (element.weather == 0) {
          rain = rain + 1;
        } else if (element.weather == 5) {
          cloud = cloud + 1;
        } else if (element.weather == 10) {
          sunny = sunny + 1;
        }
        totalData = totalData + 1;
      });

      locationData.forEach((element) => {
        // console.log("data set place type: ", element.placeType);
        if (element.placeType == 1) {
          indoor = indoor + 1;
        } else if (element.placeType == 0) {
          outdoor = outdoor + 1;
        }
        totalPlaceType = totalPlaceType + 1;
      });

      if (indoor / totalPlaceType > 0.5) {
        placeType = "INDOOR";
      } else if (outdoor / totalPlaceType > 0.5) {
        placeType = "OUTDOOR";
      }

      if (rain / totalData == 1 || rain / totalData > 0.5) {
        manualCalculation = "rain";
      } else if (cloud / totalData == 1 || cloud / totalData > 0.5) {
        manualCalculation = "cloud";
      } else if (sunny / totalData == 1 || sunny / totalData > 0.5) {
        manualCalculation = "sunny";
      } else {
        manualCalculation = "unpredectable";
      }

      if (manualCalculation == "rain" && currentWeather.main == "Rain") {
        comparedResult = "Rain";
        weatherScore = 0.2;
      } else if (
        manualCalculation == "cloud" &&
        currentWeather.main == "Rain"
      ) {
        comparedResult = "Light Rain";
        weatherScore = 0.3;
      } else if (
        manualCalculation == "sunny" &&
        currentWeather.main == "Rain"
      ) {
        comparedResult = "Light Rain";
        weatherScore = 0.3;
      } else if (
        manualCalculation == "rain" &&
        currentWeather.main == "Thunderstorm"
      ) {
        comparedResult = "Heavy Rain";
        weatherScore = 0.1;
      } else if (
        manualCalculation == "cloud" &&
        currentWeather.main == "Thunderstorm"
      ) {
        comparedResult = "Rain";
        weatherScore = 0.2;
      } else if (
        manualCalculation == "sunny" &&
        currentWeather.main == "Thunderstorm"
      ) {
        comparedResult = "Rain";
        weatherScore = 0.2;
      } else if (
        manualCalculation == "rain" &&
        currentWeather.main == "Drizzle"
      ) {
        comparedResult = "Rain";
        weatherScore = 0.2;
      } else if (
        manualCalculation == "cloud" &&
        currentWeather.main == "Drizzle"
      ) {
        comparedResult = "Light Rain";
        weatherScore = 0.3;
      } else if (
        manualCalculation == "sunny" &&
        currentWeather.main == "Drizzle"
      ) {
        comparedResult = "Cloudy";
        weatherScore = 0.5;
      } else if (
        manualCalculation == "rain" &&
        currentWeather.main == "Clear"
      ) {
        comparedResult = "Cloudy";
        weatherScore = 0.5;
      } else if (
        manualCalculation == "cloud" &&
        currentWeather.main == "Clear"
      ) {
        comparedResult = "Sunny";
        weatherScore = 0.8;
      } else if (
        manualCalculation == "sunny" &&
        currentWeather.main == "Clear"
      ) {
        comparedResult = "Sunny";
        weatherScore = 0.8;
      } else if (
        manualCalculation == "rain" &&
        currentWeather.main == "Clouds"
      ) {
        comparedResult = "Rain";
        weatherScore = 0.2;
      } else if (
        manualCalculation == "cloud" &&
        currentWeather.main == "Clouds"
      ) {
        comparedResult = "Cloudy";
        weatherScore = 0.5;
      } else if (
        manualCalculation == "sunny" &&
        currentWeather.main == "Clouds"
      ) {
        comparedResult = "Cloudy";
        weatherScore = 0.5;
      } else {
        if (currentWeather.main == "Thunderstorm") {
          comparedResult = currentWeather.main;
          weatherScore = 0.1;
        } else if (currentWeather.main == "Rain") {
          comparedResult = currentWeather.main;
          weatherScore = 0.2;
        } else if (currentWeather.main == "Drizzle") {
          comparedResult = currentWeather.main;
          weatherScore = 0.3;
        } else if (currentWeather.main == "Clear") {
          comparedResult = currentWeather.main;
          weatherScore = 1;
        } else if (currentWeather.main == "Clouds") {
          comparedResult = currentWeather.main;
          weatherScore = 0.7;
        }
      }

      if (placeType == "INDOOR" && weatherScore < 0.5) {
        weatherScore = 0.8;
      }

      const weatherPrediction = {
        RainCount: rain,
        CloudCount: cloud,
        SunnyCount: sunny,
        ManualResult: manualCalculation,
        CompairedResult: comparedResult,
        APIResult: currentWeather.main,
        weatherScore: weatherScore,
        placeType: placeType,
      };
      // console.log("Weather Analysis :", weatherPrediction);
      resovle(weatherPrediction);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

module.exports = { weatherScore };
