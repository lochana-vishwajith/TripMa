import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import { SetLiveLocation,GetLiveLocation } from "../../Store/actions";

const LiveLocation = async() => {
  console.log("live wada");
  const dispatch = useDispatch();
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission Error");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log("Location from Live Location: ", location);
    dispatch(SetLiveLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  })();
  return;
};

export default LiveLocation;
