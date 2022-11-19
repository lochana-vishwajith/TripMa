import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import RadioGroup from "react-native-radio-buttons-group";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { updateLiveStatus } from "../Api/AttractionFinderAPIs";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions, hideLiveUpdateModal } from "../../Store/actions";

const { height, width } = Dimensions.get("window");

const data = [
  {
    id: "1",
    label: "Yes",
    accessibilityLabel: "1",
  },
  {
    id: "2",
    label: "No",
    accessibilityLabel: "0",
  },
  {
    id: "3",
    label: "Don't No",
    accessibilityLabel: "2",
  },
];

const visitNowData = [
  {
    id: "1",
    label: "Yes",
    accessibilityLabel: "1",
  },
  {
    id: "2",
    label: "No",
    accessibilityLabel: "0",
  },
];

const placeTypeData = [
  {
    id: "1",
    label: "Indoor",
    accessibilityLabel: "1",
  },
  {
    id: "2",
    label: "Outdoor",
    accessibilityLabel: "0",
  },
];

const RealtimeCrowdUpdate = ({ title, isVisible, close }) => {
  const isShow = useSelector((state) => state.AuthReducer.liveUpdateModalState);
  const [radioButtons, setRadioButtons] = useState("");
  const [crowdRange, setCrowdRange] = useState("");
  const [weatherRange, setWeatherRange] = useState("");
  const [currentLocation, setCurrentLocation] = useState({});
  const dispatch = useDispatch();
  const [visitNow, setVisitNow] = useState("");
  const [placeType, setPlaceType] = useState("");

  const getLiveLocation = async () => {
    setCurrentLocation({});

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission Error");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log("now: ", location);
    console.log("now lat: ", location.coords.latitude);
    console.log("now long: ", location.coords.longitude);
    const lati = location.coords.latitude;
    const longi = location.coords.longitude;
    const myLocation = {
      lati,
      longi,
    };

    return myLocation;
  };

  const onSubmit = async () => {
    const Location = await getLiveLocation();
    console.log("LATLONG: ", Location);

    const uploadDetails = {
      location: {
        lat: Location.lati,
        lng: Location.longi,
      },
      date: new Date(),
      crowd: crowdRange,
      openStatus: radioButtons,
      weather: weatherRange,
      visit: visitNow,
      placeType: placeType,
    };

    console.log(uploadDetails);

    const result = await updateLiveStatus(uploadDetails);
    console.log("Returned result:", result);
    // dispatch(hideLiveUpdateModal());
    dispatch(hideLiveUpdateModal(false));
  };

  return (
    // <View style={styles.modalContainer}>
    <Modal animationType="fade" transparent={true} visible={Boolean(isShow)}>
      {/* <View style={styles.modalContainer}> */}
      <View style={styles.modalView}>
        <Text style={styles.textStyle}>
          Help Travelers By Updating Real time Info
        </Text>
        {/* </View>  */}
        <View style={styles.form}>
          <Text style={styles.textForm}>Is Place Open Now?</Text>
          <RadioGroup
            radioButtons={data}
            onPress={(e) => {
              const transportUse = JSON.parse(JSON.stringify(e));
              e.forEach((use) => {
                if (use.selected) {
                  setRadioButtons(use.accessibilityLabel);
                }
                // console.log(radioButtons);
              });
            }}
            layout="row"
            size={12}
          />
          <Text style={styles.textForm}>Is Place Crowded Now?</Text>
          <Slider
            style={{ width: width / 1.4, height: 40, alignSelf: "center" }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            step={5}
            onValueChange={(val) => setCrowdRange(val)}
          />
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderText}>Low</Text>
            <Text style={styles.sliderText}>Average</Text>
            <Text style={styles.sliderText}>Heavily</Text>
          </View>
          <Text style={styles.textForm}>How is the Weather Condition?</Text>
          <Slider
            style={{ width: width / 1.4, height: 40, alignSelf: "center" }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            step={5}
            onValueChange={(val) => setWeatherRange(val)}
          />
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderText}>Rainy</Text>
            <Text style={styles.sliderText}>Cloudy</Text>
            <Text style={styles.sliderText}>Sunny</Text>
          </View>
          <Text style={styles.textForm}>Place type?</Text>
          <RadioGroup
            radioButtons={placeTypeData}
            onPress={(e) => {
              const transportUse = JSON.parse(JSON.stringify(e));
              e.forEach((use) => {
                if (use.selected) {
                  setPlaceType(use.accessibilityLabel);
                }
                // console.log(radioButtons);
              });
            }}
            layout="row"
            size={12}
          />
          <Text style={styles.textForm}>Should visit this place now?</Text>
          <RadioGroup
            radioButtons={visitNowData}
            onPress={(e) => {
              const transportUse = JSON.parse(JSON.stringify(e));
              e.forEach((use) => {
                if (use.selected) {
                  setVisitNow(use.accessibilityLabel);
                }
                // console.log(radioButtons);
              });
            }}
            layout="row"
            size={12}
          />
          <View style={styles.submitBtnContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={["#FBD786", "#f7797d"]}
                style={styles.buttonGredient}
              >
                <Pressable onPress={onSubmit} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>Submit</Text>
                </Pressable>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    //</View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    //    flexDirection: 'row',
    //    justifyContent: 'center',
    //    alignItems: 'center',
    alignSelf: "center",
    top: height / 8,
    width: width / 1.1,
    height: height / 1.19,
    backgroundColor: "#f7797d",
    borderRadius: 10,
    opacity: 0.9,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: height / 40,
  },
  form: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textForm: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    width: width / 2,
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
  submitBtnContainer: {
    marginLeft: width / 5,
    marginTop: height / 45,
  },
  sliderTextContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "baseline",
    // alignContent:"space-between",
    marginLeft: width / 10,
  },
  sliderText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    // paddingHorizontal:50,
    paddingRight: 90,
  },
});
export default RealtimeCrowdUpdate;
// export default connect(mapStateToProps)(RealtimeCrowdUpdate);
