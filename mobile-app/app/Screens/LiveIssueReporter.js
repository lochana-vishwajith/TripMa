import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Picker,
  View,
  TextInput,
  Switch,
  Button,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import RadioGroup from "react-native-radio-buttons-group";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { updateLiveStatus } from "../Api/AttractionFinderAPIs";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
const { height, width } = Dimensions.get("window");
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const LiveIssueReporter = ({ title, isVisible, close, navigation }) => {
  const [selectedValue, setselectedValue] = useState("");
  const [location, setLocation] = useState(null);
  const [issueType, setIssueType] = useState(null);
  const [issueRating, setIssueRating] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [description, setDescription] = useState(null);
  const [Issue, setIssue] = useState(null);
  const [addL, setaddL] = useState(true);
  const [IsgetcurrentLocation, setIsgetCurrentLocation] = useState(false);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState("date");
  const [isDisplayDate, setShow] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selecttime, setselecttime] = useState(false);
  const [locationObj, setLocationObj] = useState();
  const [formataddress, setadddress] = useState();
  const [currdate, setcurrDate] = useState(new Date());

  const changeSelectedDate = (event, selectedDateTime) => {
    console.log(event);
    if (event?.type === "dismissed") {
      alert("date doesnt selected");
    }

    console.log("display mode date selected");
    const currentDate = selectedDateTime;
    setcurrDate(selectedDateTime);

    setShow(false);
  };

  const changeSelectedTime = (event, selectedDateTime) => {
    console.log(event);
    if (event?.type === "dismissed") {
      alert("Time doesnt selected");
    }

    console.log("display mode date selected");
    const currentDate = selectedDateTime;
    setTime(selectedDateTime);

    setselecttime(false);
  };

  const toggleSwitch = async () => {
    setIsgetCurrentLocation((IsgetcurrentLocation) => !IsgetcurrentLocation);
    const Location = await getLiveLocation();
    if (Location) {
      console.log("LATLONGs: ", Location);
      setLocation(Location);
    } else {
      setIsgetCurrentLocation((IsgetcurrentLocation) => !IsgetcurrentLocation);
    }
  };

  const getLiveLocation = async () => {
    setLocation({});

    let { status } = await Location.requestForegroundPermissionsAsync();
    let { backstatus } = await Location.requestBackgroundPermissionsAsync();

    console.log(backstatus, "back status");
    console.log(status);
    if (status !== "granted") {
      alert("Permission Error");
      setaddL(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    console.log("now: ", location);
    console.log("now lat: ", location.coords.latitude);
    console.log("now long: ", location.coords.longitude);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const myLocation = {
      latitude,
      longitude,
    };

    return myLocation;
  };

  const onPlaceSelected = (details) => {
    // console.log("hitsss position");
    console.log("formated address", details.formatted_address);
    setaddL(false);
    setadddress(details.formatted_address);
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setLocation(position);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Get Current Location</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={IsgetcurrentLocation}
          onValueChange={toggleSwitch}
        />
      </View>

      <View style={styles.destintionContainer}>
        <View style={styles.destinationLabelcontainer}>
          <Text style={styles.text}>Choose Destination</Text>
        </View>
        <View style={styles.locationtxtContainer}>
          <GooglePlacesAutocomplete
            placeholder="Destination"
            fetchDetails
            onPress={(data, details = null) => {
              onPlaceSelected(details, "origin");
            }}
            styles={{ textInput: styles.destinationTextInputLocation }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </View>
      </View>
      <View style={styles.mainBtnContainer}>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => {
            setselecttime(false);
            setShow(true);
          }}
        >
          <Text>Set Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => {
            setShow(false);
            setselecttime(true);
          }}
        >
          <Text>Set Time</Text>
        </TouchableOpacity>
      </View>

      {selecttime && (
        <DateTimePicker
          value={mydate}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={changeSelectedTime}
        />
      )}

      {isDisplayDate && (
        <DateTimePicker
          value={mydate}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      )}

      <View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            console.log("clicked");

            if (location && currdate && time) {
              let obj = {
                addr: formataddress,
                location: location,
                date: currdate,
                time: time,
              };

              if (!obj.addr) {
                obj.addr = "Malabe Campus, New Kandy Rd";
              }
              console.log("obj :", time);
              navigation.navigate("LiveissueDetails", { data: obj });
            } else {
              alert("please fill all the fields");
            }
          }}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Text style={styles.loginBtnText}>PROCEED</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  scrollView: {
    marginBottom: 90,
    marginTop: 30,
  },
  text: {
    fontSize: 15,
    marginBottom: "3%",
    marginTop: "3%",
  },
  textheading: {
    fontSize: 25,
    marginBottom: "2%",
  },
  formItem2: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
    marginTop: 10,
    marginBottom: -20,
  },
  textinputDes: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 20,
    paddingHorizontal: 20,
    borderColor: "#f7797d",
  },
  textinput: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 22,
    paddingHorizontal: 10,
    borderColor: "#f7797d",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textinputlast: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 22,
    paddingHorizontal: 10,
    borderColor: "#f7797d",
    marginBottom: 20,
  },
  btnSuggestions: {
    marginTop: 20,
    paddingTop: 20,
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingVertical: "2%",
  },
  mapcontainer: {
    height: "20%",
    width: "100%",
  },
  destintionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height / 40,
    marginBottom: "10%",
  },
  destinationLabelcontainer: {
    justifyContent: "center",
  },
  locationtxtContainer: {
    width: "55%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGredient: {
    borderRadius: 10,
    width: "100%",
  },
  datepickerbtn: {
    borderColor: "#f7797d",
    borderWidth: 2,
    backgroundColor: "red",
  },
  mainBtnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15%",
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

export default LiveIssueReporter;
// export default connect(mapStateToProps)(RealtimeCrowdUpdate);
