import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";
import { SetPreferencesValues } from "../../Store/actions";
import Spinner from "react-native-loading-spinner-overlay";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");

export default function SafetyPreferences({ navigation, route }) {
  const [police, setpolice] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [pharmacy, setpharmacy] = useState([]);
  const [busstation, setbusstation] = useState([]);
  const [gasStation, setgasStation] = useState([]);
  const [resturants, setresturants] = useState([]);
  const [railway, setrailway] = useState([]);
  const [taxi, settaxi] = useState([]);
  const [spinnerStatus, setSpinnerStatus] = useState(false);

  const curr_locat = useSelector(
    (state) => state.AuthReducer.safetyLocationSelector
  );

  return (
    <View style={styles.container}>
      <Text style={styles.createTxt}>
        Please Set the priority for each factor
      </Text>
      <ScrollView>
        <View>
          <Text style={styles.textForm}>Police</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setpolice(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{police}</Text>
            </View>
          </View>

          <Text style={styles.textForm}>hospital</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => sethospital(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{hospital}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Pharmacy</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setpharmacy(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{pharmacy}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Resturants</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setresturants(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{resturants}</Text>
            </View>
          </View>

          <Text style={styles.textForm}>Taxi Station</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => settaxi(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{taxi}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Train Station</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setrailway(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{railway}</Text>
            </View>
          </View>

          <Text style={styles.textForm}>Gas Station</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setgasStation(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{gasStation}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Resturants</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setresturants(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{resturants}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          console.log(curr_locat + "currentlocation");

          setSpinnerStatus(true);

          console.log(curr_locat.latitude);
          let obj = {
            location: {
              latitude: curr_locat.latitude,
              longitude: curr_locat.longitude,
            },
            objs: {
              policedefScore: police,
              hospitaldefScore: hospital,
              pharmacydefScore: pharmacy,
              railwaydefScore: 0,
              taxistanddefScore: taxi,
              resturantdefScore: resturants,
              gasstationdefScore: 0,
              buststanddefscore: 0,
            },
          };

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
                  latitude: curr_locat.latitude,
                  longitude: curr_locat.longitude,
                },
              };
              setSpinnerStatus(false);
              console.log("nextpage with matrix and return object");
              navigation.navigate("PlaceSafetyIndex", { data: dobj });
            })
            .catch((err) => console.log(err.response));
          setSpinnerStatus(false);
        }}
      >
        <LinearGradient
          colors={["#FBD786", "#f7797d"]}
          style={styles.buttonGredient}
        >
          <Text style={styles.loginBtnText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
      {spinnerStatus ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 8,
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
  },
  valueContainer: {
    alignItems: "center",
    width: "20%",
  },
  textForm: {
    marginVertical: height / 150,
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
  safetypreferences: {
    marginBottom: "5%",
    backgroundColor: "green",
  },
});
