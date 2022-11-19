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
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import axios from "axios";
const { height, width } = Dimensions.get("window");
//const mapRef = useRef(1);
export default function NearByIssueWithMap({ route, navigation }) {
  const { data } = route.params;
  console.log("awaaaa");
  let issueslist = [];
  console.log(data);

  if (data.issueslist.length > 0) {
    issueslist = data.issueslist;
  }

  console.log("issues list", issueslist);

  let health = [...issueslist];
  let security = [...issueslist];
  let transport = [...issueslist];
  let Infastructure = [...issueslist];
  //Attraction positive count
  health = health.filter((issue) => {
    return issue.IssueType == "medical";
  });
  security = security.filter((issue) => {
    return issue.IssueType == "security";
  });
  transport = transport.filter((issue) => {
    return issue.IssueType == "transport";
  });
  Infastructure = Infastructure.filter((issue) => {
    return issue.IssueType == "accommodation" || issue.IssueType == "fuel";
  });

  return (
    <View style={styles.container}>
      <Text style={styles.topicTxt}>
        Summary of the issues happened Place you Entered
      </Text>

      <View style={styles.scoreContainer}>
        <View style={styles.totalTxtCon}>
          <Text style={styles.totaltxt}>Total Safety Issues</Text>
          <Text style={styles.totalpercentage}>{issueslist.length}</Text>
        </View>
        <View style={styles.otherPerce}>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Security Issues</Text>
            <Text style={styles.otherVal}>{security.length}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Health Issues</Text>
            <Text style={styles.otherVal}>{health.length}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Transportation{"\n"} Issues</Text>
            <Text style={styles.otherVal}>{transport.length}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Infastructural {"\n"} Issues</Text>
            <Text style={styles.otherVal}>{Infastructure.length}</Text>
          </View>
        </View>
      </View>
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
