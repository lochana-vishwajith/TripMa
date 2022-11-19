import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { GOOGLE_API_KEY } from "../Config/environments";
import MapViewDirections from "react-native-maps-directions";
import Spinner from "react-native-loading-spinner-overlay";

import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");

const par = {
  location: {
    latitude: "7.2906",
    longitude: "80.6337",
  },

  objs: {
    policedefScore: 10,
    hospitaldefScore: 10,
    pharmacydefScore: 10,
    railwaydefScore: 0,
    taxistanddefScore: 10,
    resturantdefScore: 10,
    gasstationdefScore: 10,
    buststanddefscore: 10,
  },
};

const PlaceSafetyIndex = ({ route, navigation }) => {
  const mapRef = useRef(1);
  const { data } = route.params;
  const matrixObj = data.data.matrix;
  const location = data.location;
  const [showMapobj, SetShowMatrixObj] = useState([]);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [nearbyIssues, setnearbyissueslist] = useState([]);
  useEffect(() => {
    setSpinnerStatus(true);

    let obj = {
      origin: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };
    axios
      .post(
        `http://travel-buddy-research.herokuapp.com/liveIssue/nearbyissues`,
        obj
      )
      .then((res) => {
        console.log(res.data.length);
        setnearbyissueslist(res.data);
      })
      .catch((err) => console.log(err.response));
    setSpinnerStatus(false);
  }, []);

  return (
    // <View></View>

    <View style={styles.container}>
      <Text style={styles.topicTxt}>Safety Index of the Place you Entered</Text>
      {matrixObj && (
        <View style={styles.scoreContainer}>
          <View style={styles.totalTxtCon}>
            <Text style={styles.totaltxt}>Total Safety Index</Text>
            <Text style={styles.totalpercentage}>
              {matrixObj.total === null ? 0 : parseInt(matrixObj.total) * 10}%
            </Text>
          </View>
          <View style={styles.otherPerce}>
            <View style={styles.otherPerceVal}>
              <Text style={styles.otherTxt}>Security Safety</Text>
              <Text style={styles.otherVal}>
                {matrixObj.security === null
                  ? 0
                  : parseInt(matrixObj.security) * 10}
                %
              </Text>
            </View>
            <View style={styles.otherPerceVal}>
              <Text style={styles.otherTxt}>Health Safety</Text>
              <Text style={styles.otherVal}>
                {matrixObj.health === null
                  ? 0
                  : parseInt(matrixObj.health) * 10}
                %
              </Text>
            </View>
            <View style={styles.otherPerceVal}>
              <Text style={styles.otherTxt}>Transportation{"\n"} Safety</Text>
              <Text style={styles.otherVal}>
                {matrixObj.transport === null
                  ? 0
                  : parseInt(matrixObj.transport) * 10}
                %
              </Text>
            </View>
            <View style={styles.otherPerceVal}>
              <Text style={styles.otherTxt}>Infastructural {"\n"} Safety</Text>
              <Text style={styles.otherVal}>
                {matrixObj.infastructure === null
                  ? 0
                  : parseInt(matrixObj.infastructure) * 10}
                %
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.issuecountcont}>
        <Text style={styles.issuetext}>{nearbyIssues.length}</Text>
        <Text style={styles.issuecnttxt}>No of Issues Reported Nearby</Text>
      </View>

      {nearbyIssues.length > 0 && (
        <View style={styles.buttonCon}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate("NearByIssueList", { data: nearbyIssues });
            }}
          >
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              <Text style={styles.loginBtnText}>Near by issue list</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlaceSafetyIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 8,
  },
  topicTxt: {
    fontSize: 20,
  },
  mapContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scoreContainer: {
    marginTop: "4%",
    height: height / 2,
  },
  totalTxtCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  totaltxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalpercentage: {
    fontWeight: "bold",
    fontSize: 60,
  },
  otherPerce: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    // marginTop: "10%",
    borderTopWidth: 3,
    borderTopColor: "#f7797d",
  },
  otherTxt: {
    fontSize: 20,
  },
  otherPerceVal: {
    alignItems: "center",
    marginBottom: "7%",
  },
  otherVal: {
    fontSize: 30,
    marginTop: "5%",
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
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    width: "100%",
  },
  buttonCon: {
    marginTop: "5%",
  },
  issuecountcont: {
    alignSelf: "center",
  },
  issuetext: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  issuecnttxt: {
    fontSize: 20,
  },
});
