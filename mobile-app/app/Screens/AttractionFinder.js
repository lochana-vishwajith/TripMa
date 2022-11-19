import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import LiveLocation from "../Components/LiveLocation";

const { height, width } = Dimensions.get("window");
const aspectWidth = width / 1.1;
const aspectHeight = height / 150;
const ASPECT_RATIO = aspectWidth / aspectHeight;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  // latitude: 40.767110,
  // longitude: -73.979704,
  // latitudeDelta: LATITUDE_DELTA,
  // longitudeDelta: aspectWidth / aspectHeight,
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const AttractionFinder = ({ navigation }) => {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mapbound, setMapbound] = useState([]);

  const mapRef = useRef(1);
  const [mapReff, updateMapReff] = useState(null);
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
      updateMapReff(mapRef);
    }
  };

  const edgeValue = 50;

  const edgePadding = {
    top: edgeValue,
    right: edgeValue,
    left: edgeValue,
    bottom: edgeValue,
  };

  const routeOnReady = (val) => {
    if (val) {
      setDistance(val.distance);
      setDuration(val.duration);
    }
  };
  const traceRoute = () => {
    if (origin && destination) {
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
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

  const getBoundaries = () => {
    if (mapReff === null) {
      return;
    }
    mapReff
      .getMapBoundaries()
      .then((res) => {
        setMapbound(res);
        console.log("boundartisss: ", mapbound);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topicContainer}>
        <Text style={styles.topic}>Plan Your Journey</Text>
      </View>
      <View style={styles.formItem1}>
        <GooglePlacesAutocomplete
          placeholder="Origin"
          styles={{ textInput: styles.textinput }}
          fetchDetails
          onPress={(data, details = null) => {
            console.log(data, details);
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
            console.log(data, details);
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
            <Pressable
              onPress={traceRoute}
              // onPress={() => {
              //   navigation.navigate("AttractionMap");
              // }}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>View on Map</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={["#FBD786", "#f7797d"]}
          style={styles.buttonGredient}
        >
          <Pressable
            onPress={() => {
              // navigation.navigate("AttractionList", { cordinates: mapbound });
              navigation.navigate("AttractionPreferences", {
                cordinates: mapbound,
              });
            }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>See List</Text>
          </Pressable>
        </LinearGradient>
      </TouchableOpacity>
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
          // ref={mapRef}
          ref={(mapReff) => {
            updateMapReff(mapReff);
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          // onMapReady={()=>{getBoundaries()}}
          onRegionChangeComplete={() => {
            getBoundaries();
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // onRegionChangeComplete={(e) => {
          //   console.log("newdata", e);
          // const position ={
          //   latitude: e.latitude,
          //   longitude: e.longitude,
          // }
          // setMapbound(position);
          // }}
        >
          {mapbound.southWest && <Marker coordinate={mapbound.southWest} />}
          {mapbound.northEast && <Marker coordinate={mapbound.northEast} />}
          {origin && <Marker coordinate={origin} />}
          {destination && <Marker coordinate={destination} />}
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
        </MapView>
      </View>
    </View>
  );
};

export default AttractionFinder;

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
