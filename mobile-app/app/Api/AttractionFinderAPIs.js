import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetLiveLocation } from "../../Store/actions";
import * as Location from "expo-location";

const url =
  "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary";
const liveUpdateURL = "https://travel-buddy-research.herokuapp.com/liveCrowd";
const GOOGLE_API_URL = "AIzaSyC8QMeIOVQVhYuAbnEWI69t-376AEdw-Y0";

export const getAttractionList = async (cordinates) => {
  try {
    console.log("Back Cords", cordinates);
    const {
      data: { data },
    } = await axios.get(url, {
      params: {
        tr_longitude: cordinates.northEast.longitude,
        tr_latitude: cordinates.northEast.latitude,
        bl_longitude: cordinates.southWest.longitude,
        bl_latitude: cordinates.southWest.latitude,
        limit: 20,
        currency: "USD",
        lunit: "km",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": "cf0f60c210mshdf57479afa811b9p1da346jsn21e8eeb410cf",
      },
    });
    const p = data.map((d) => {
      d;
    });
    console.log(p);
    return data;
  } catch (error) {
    console.log("Error Data Fetching...", error);
  }
};

export const updateLiveStatus = async (data) => {
  await axios
    .post(liveUpdateURL, data)
    .then((result) => {
      console.log("result ", result);
      if (result.status === 200) {
        return result;
      }
    })
    .catch((err) => {
      console.log("error ", err);
    });
};

export const getGoogleAttractionList = async (coordinates) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const dispatch = useDispatch();
      // dispatch(GetLiveLocation());

      // let location = useSelector((state)=>state.AuthReducer.liveLocation);
      // console.log("Attraction Finer API Loca: ",location);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission Error");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      console.log(
        "Location from Live Location API Finder: ",
        location.coords.latitude
      );
      // 6.8667, 81.0466
      await axios
        .get(
        // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude}%2C${location.coords.longitude}&radius=2000&type=tourist_attraction&key=${GOOGLE_API_URL}`
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=6.8667%2C81.0466&radius=2000&type=tourist_attraction&key=${GOOGLE_API_URL}`
        )
        .then((res) => {
          //  console.log("Google map res:",res.data.results);
          resolve(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  });
};
