const axios = require("axios");
require("dotenv").config();
const moment = require("moment");

const currentWeather = async (selectedLat, selectedLng) => {
  return new Promise(async (resovle, reject) => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLng}&appid=${process.env.OPENWEATHER_API_KEY}`
      )
      .then((res) => {
        const curentWeather = {
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          time: moment.unix(res.data.dt).format(),
        };
        // console.log("Weather data", curentWeather);
        resovle(curentWeather);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

const hourlyWeather = async (selectedLat, selectedLng) => {
  const tommorow = moment().endOf("day").unix();
  // console.log("Time : ", tommorow);
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLat}&lon=${selectedLng}&appid=${process.env.OPENWEATHER_API_KEY}`
    )
    .then((res) => {
      //   const cuurentWeather = {
      //     main: res.data.weather[0].main,
      //     description: res.data.weather[0].description,
      //     time: moment.unix(res.data.dt).format(),
      //   };
      let todayWeather = [];
      res.data.list.forEach((data) => {
        if (data.dt < tommorow) {
          todayWeather.push(data);
        }
      });

      // console.log("Weather data Hourly", todayWeather);
      return todayWeather;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { currentWeather, hourlyWeather };
