import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { selectPlaceForSecurity } from "../../Store/actions";
import axios from "axios";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");
const SearchPlaceSafety = ({ navigation }) => {
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const dispatch = useDispatch();

  const onPlaceSelected = (details, flag) => {
    console.log(details);
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };

    console.log(typeof position + "position lattitude mj");

    setCurrentLocation(position);
  };

  const handlerSubmit = () => {
    console.log(currentLocation.latitude + "ghgcfgxrtx");

    dispatch(selectPlaceForSecurity(currentLocation));
    navigation.navigate("SafetyPreferences");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainBtnContainer}>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("SafeRouteScreen")}
        >
          <Text>Routes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("LiveIssueReporter")}
        >
          <Text>Report a Issues</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: "4%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Search for Nearby Safety
        </Text>
      </View>
      <View>
        <Text style={styles.destinationLabel}>Select Location</Text>
      </View>
      <View style={styles.formItem2}>
        <GooglePlacesAutocomplete
          placeholder="Destination"
          styles={{ textInput: styles.textinput }}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => handlerSubmit()}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Text style={styles.findBtnText}>Find</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            console.log(
              currentLocation.latitude + "" + currentLocation.latitude
            );

            if (currentLocation.latitude) {
              setSpinnerStatus(true);

              console.log(currentLocation.latitude);
              let obj = {
                location: {
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                },
                objs: {
                  policedefScore: 3,
                  hospitaldefScore: 4,
                  taxistanddefScore: 2,
                  resturantdefScore: 1,
                  railwaydefScore: 0,
                  pharmacydefScore: 0,
                  gasstationdefScore: 0,
                  buststanddefscore: 0,
                },
              };

              console.log(obj + "passed obj");
              await axios
                .post(
                  `https://travel-buddy-research.herokuapp.com/safetyIndexpreferences`,
                  obj
                )
                .then((res) => {
                  console.log(res.data.gas_stationObj[0]);
                  let dobj = {
                    data: res.data,
                    location: {
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    },
                  };
                  setSpinnerStatus(false);
                  console.log("nextpage with matrix and return object");
                  navigation.navigate("PlaceSafetyIndex", { data: dobj });
                })
                .catch((err) => console.log(err.response));
              setSpinnerStatus(false);
            } else {
              alert("please add a location First");
            }
          }}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Text style={styles.findBtnText}>Find Without Prefernces</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {spinnerStatus ? <AppLoader /> : null}
    </View>
  );
};

export default SearchPlaceSafety;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  buttonGredient: {
    borderRadius: 10,
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    width: "100%",
  },

  findBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: "3%",
  },
  destinationLabel: {
    fontSize: 15,
    marginBottom: "4%",
  },
  formItem2: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
  },
  mainBtnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainBtn: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#f7797d",
    padding: "3%",
    width: width / 2.5,
    alignItems: "center",
    marginBottom: height / 25,
  },
});
