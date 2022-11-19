import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";
import AppLoader from "../Components/AppLoader";
import { FlatList } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");


export default function RegisterScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const locations = route.params;
  console.log("LOC ARRAY: ", locations);

  const preferences = useSelector(
    (state) => state.AuthReducer.attractionPreferences
  );

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 6.915531,
    longitude: 79.92735,
  });
  const [tripLocations, setTripLocations] = useState(locations.locations);

  const sortedLocations = [];
  const [mapLocations, setMapLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission Error");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // console.log("now: ", location);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("TRIP LOCATIONS ARRAY:", tripLocations);
      tripLocations.forEach(async (element) => {
        await axios
          .get(
            `https://travel-buddy-research.herokuapp.com/liveCrowd/${element.coords.lat}/${element.coords.lng}/${preferences.crowd}/${preferences.weather}`
          )
          .then((res) => {
            const dataSet = {
              lat: element.coords.lat,
              lng: element.coords.lng,
              totScore: res.data.totalScore,
              name: element.name,
            };
            sortedLocations.push(dataSet);
            // console.log("Sorted:", sortedLocations);
          })
          .then(() => {
            // for (let i = 0; i < sortedLocations.length; i++) {
            //   for (let j = 0; j < sortedLocations.length - i - 1; j++) {
            //     if (
            //       sortedLocations[j].totScore < sortedLocations[j + 1].totScore
            //     ) {
            //       var temp = sortedLocations[j];
            //       sortedLocations[j] = sortedLocations[j + 1];
            //       sortedLocations[j + 1] = temp;
            //     }
            //   }
            // }
            sortedLocations.sort((a, b) => {
              return b.totScore - a.totScore;
            })
            console.log("Sorted Correct:", sortedLocations);
            setMapLocations(...sortedLocations);
            console.log("State Arr:", mapLocations);

            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      });

      // console.log("TRIP LOC:", tripLocations);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
      >
        {tripLocations.map((val, index) => {
          return (
            <>
              <MapView.Marker
                coordinate={{
                  latitude: val.coords.lat,
                  longitude: val.coords.lng,
                }}
                key={index}
                title={val.name}
              />
            </>
          );
        })}
      </MapView>
      <View>
        <Text style={styles.attractionName}>Attraction Precedence</Text>
      
        {tripLocations.map((val, index) => {
          return (
            <>
            <View style={styles.attractionList}>
              <Text>{index+1} visit {val.name}</Text>
            </View>  
            </>
          );
        })}
      </View>
      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: height / 9,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.5,
  },
  attractionName:{
    fontSize:20,
    alignSelf:"center",
    marginTop:"5%"
  },
  attractionList:{
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop:5,
    paddingHorizontal:10
  },
  cardContent: {
    width: width / 1.1,
    height: height / 4,
    marginTop: height / 45,
    borderRadius: 10,
    borderColor: "#f7797d",
    borderWidth: 0.5,
  },
});
