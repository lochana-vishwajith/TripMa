import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useUpdateEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";
import { SetAttractionPreferences, GetLiveLocation } from "../../Store/actions";

const { height, width } = Dimensions.get("window");

export default function AttractionPreferences({ navigation, route }) {
  const dispatch = useDispatch();
  const { cordinates } = route.params;
  console.log("Coordinates", cordinates);

  const [crowdPref, setCrowdPref] = useState(0);
  const [weatherPref, setWeatherPref] = useState(0);

  const NextPageEnable = (crowd, weather) => {
    console.log(crowd, weather);

    const preferences = {
      crowd,
      weather,
    };

    dispatch(SetAttractionPreferences(preferences));
    navigation.navigate("AttractionList", cordinates);
  };

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.createTxt}>
        Please Set the priority for each factor
      </Text>
      <Text style={styles.textForm}>Crowdedness of the place</Text>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderCom}>
          <Slider
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="#f7797d"
            maximumTrackTintColor="#f7797d"
            thumbTintColor="#f7797d"
            step={1}
            onValueChange={(val) => setCrowdPref(val)}
          />
        </View>
        <View style={styles.valueContainer}>
          <Text>{crowdPref}</Text>
        </View>
      </View>
      <Text style={styles.textForm}>
        Weather Condition | Rainy(lowest) - Sunny(Highest)
      </Text>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderCom}>
          <Slider
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="#f7797d"
            maximumTrackTintColor="#f7797d"
            thumbTintColor="#f7797d"
            step={1}
            onValueChange={(val) => setWeatherPref(val)}
          />
        </View>
        <View style={styles.valueContainer}>
          <Text>{weatherPref}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => NextPageEnable(crowdPref, weatherPref)}
      >
        <LinearGradient
          colors={["#FBD786", "#f7797d"]}
          style={styles.buttonGredient}
        >
          <Text style={styles.loginBtnText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  BtnContainer: {
    width: "100%",
    height: height / 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: height / 50,
  },
  createBtn: {
    borderColor: "#f7797d",
    borderRadius: 20,
    borderWidth: 0.7,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  updateBtn: {
    borderColor: "#f7797d",
    borderRadius: 20,
    borderWidth: 0.7,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: "77%",
  },
  title: {
    fontSize: 15,
    color: "#f7797d",
  },
  sliderContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  sliderCom: {
    width: "85%",
  },
  createTxt: {
    fontSize: 18,
    paddingVertical: height / 40,
    fontWeight: "bold",
  },
  componentContainer: {
    paddingTop: height / 90,
    padding: 10
  },
  valueContainer: {
    alignItems: "center",
    width: "20%",
  },
  textForm: {
    marginVertical: height / 60,
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
  },
  buttonGredient: {
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: height / 17,
    flexDirection: "row",
  },
  cretedTxt: {
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: height / 25,
    color: "#f7797d",
  },
  createdContent: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  warningIcon: {
    color: "#f7797d",
  },
});
