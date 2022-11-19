import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  InteractionManager,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import { googleGeocodeAsync } from "expo-location/build/LocationGoogleGeocoding";
import { SetSugestionsforSafety } from "../../Store/actions";
import { useDispatch } from "react-redux";
const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import AppLoader from "../Components/AppLoader";
const Image = require("../assets/sissue.png");

const INITIAL_POSITION = {
  latitude: 7.8774222,
  longitude: 80.7003428,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const SafeRouteFinder = ({ navigation }) => {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [SAFETY, setSAFETY] = useState([]);
  const [cords, setcords] = useState([]);
  const [data, setData] = useState(0);
  const [issueLength, setIssueLength] = useState(false);
  const mapRef = useRef(1);
  const [spinnerStatus, setSpinnerStatus] = useState(false);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgeValue = 50;

  const edgePadding = {
    top: edgeValue,
    right: edgeValue,
    left: edgeValue,
    bottom: edgeValue,
  };

  const showRiskAreas = {};

  const routeOnReady = async (val) => {
    console.log("val cord start");
    if (val) {
      setDistance(val.distance);
      setDuration(val.duration);
      setcords(val.coordinates);
    }
  };

  const drawsafetyzones = () => {
    setData(10);
    let obj1 = {
      name: "hasitha",
    };

    if (data) {
      navigation.navigate("ShowSafetySuggessions", {
        obj12: JSON.stringify(obj1),
      });
    } else {
      console.log("nodata");
    }
  };

  const dispatch = useDispatch();

  const traceRoute = async () => {
    console.log("clicked here");
    setSpinnerStatus(true);

    const objd = {
      routecords: [...cords],
    };

    console.log(objd);

    // console.log(cords.length, "cordinateessssss");
    await axios
      .post("https://travel-buddy-research.herokuapp.com/safetyIndex", objd)
      .then((result) => {
        console.log("rdaerror ekak enwasdaasdvdsvsdfsdfsdf");
        console.log(result.data.length, "datasadasdasdasdasdasdasdasdasdasd");
        console.log(result);
        if (result.data.length > 0) {
          setIssueLength(true);
        } else {
          setIssueLength(false);
        }

        setSAFETY(result.data);
      })
      .catch((err) => {
        console.log("error ", err);
      });

    if (origin && destination) {
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
      setSpinnerStatus(false);
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  const getSafetyMatrix = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topicContainer}>
        <Text style={styles.topic}>Check for Reported Issues Nearby</Text>
      </View>
      <View style={styles.formItem1}>
        <GooglePlacesAutocomplete
          placeholder="Origin"
          styles={{ textInput: styles.textinput }}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details, "origin");
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>

      <View style={styles.formItem2}>
        <GooglePlacesAutocomplete
          placeholder="Destination"
          styles={{ textInput: styles.textinput }}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details, "destination");
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>

      <View style={styles.buttonSpace}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable onPress={traceRoute} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>View on Map</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.hrLine} />
      {distance && duration ? (
        <>
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            {/* <Text>Duration: {Math.ceil(duration)}mins</Text> */}
          </View>
        </>
      ) : null}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onRegionChangeComplete={(e) => {}}
        >
          {origin && <Marker coordinate={origin} />}
          {destination && (
            <Marker
              coordinate={destination}
              onPress={() => {
                console.log("click the marker");
              }}
            />
          )}
          {/* <Marker coordinate={mapbound} /> */}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor="#f7797d"
              strokeWidth={3}
              onReady={routeOnReady}
            />
          )}
          {issueLength &&
            SAFETY.map((o, index) => {
              //navigation.navigate("NearbyIssueDetail", { data: o });

              return (
                <View key={index}>
                  <Marker
                    title={o.Issue}
                    description={o.description}
                    icon={Image}
                    coordinate={{
                      latitude: parseFloat(o.location.latitude),
                      longitude: parseFloat(o.location.longitude),
                    }}
                    pinColor="#FFFF00"
                  />
                </View>
              );
            })}
        </MapView>
      </View>
      {spinnerStatus ? (
        <AppLoader>
          <Text>Please Wait Route is Analyzing</Text>
        </AppLoader>
      ) : null}
    </View>
  );
};

export default SafeRouteFinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 30,
  },
  topicContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  topic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f7797d",
  },
  formItem1: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
    marginTop: 10,
    marginBottom: -20,
  },
  formItem2: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
  },
  textinput: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 20,
    paddingHorizontal: 20,
    borderColor: "#f7797d",
    // marginTop: height / 40,
  },
  textinputDes: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 20,
    paddingHorizontal: 20,
    borderColor: "#f7797d",
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  buttonGredient: {
    borderRadius: 10,
  },
  hrLine: {
    paddingTop: height / 50,
    borderBottomWidth: 0.7,
    marginBottom: height / 70,
  },
  mapContainer: {
    marginTop: height / 150,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: width / 1.1,
    height: 260,
  },
  buttonSpace: {
    marginTop: -15,
    marginBottom: 10,
  },
});
