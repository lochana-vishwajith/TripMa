import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
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

const ShowSafetySuggessions = ({ route, navigation }) => {
  const [useFul, setuseful] = useState(true);

  const { data } = route.params;
  let suggestions = [];
  console.log("boolean scn eka", data.suggestionsScore);
  if (data.suggestionsScore) {
    suggestions = data.suggestions;
  }

  // issuggestionsAvailable = data.suggestionsScore;
  console.log(data);
  const renderItem = ({ item }) => (
    <Pressable>
      <View style={styles.cardStyles}>
        <Text style={{ fontSize: 20 }}>Issue - {item.issue}</Text>
        <Text style={{ fontSize: 20 }}>Suggestion - {item.descriptions}</Text>

        <View
          style={{
            flexDirection: "row",
            alignContent: "space-around",
            marginTop: 10,
          }}
        ></View>
        {/* 
        <View style={styles.mainBtnContainer}> */}
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => {
            const senddata = {
              id: data._id,
              issueNew: data.Issue,
              issuePast: item.issue,
              useracceptSuggestion: item.descriptions,
              useracceptPrecaution: item.precautions,
            };
            navigation.navigate("showsuggestionDetails", { data: senddata });

            console.log("nextpage", senddata);
          }}
        >
          <Text>Matching Suggestion</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  console.log(data);
  return (
    <View style={styles.container}>
      {data.suggestionsScore && (
        <View style={styles.buttonSpace}>
          <TouchableOpacity>
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              {/* not resolve button */}
              <Pressable
                onPress={async () => {
                  const idobj = {
                    id: data._id,
                  };

                  if (data._id) {
                    await axios
                      .post(
                        `http://travel-buddy-research.herokuapp.com/liveIssue/UpdateIssueStatus`,
                        idobj
                      )
                      .then((res) => {
                        console.log(res.data.length);
                        //navigation.navigate()
                        setuseful(false);
                      })
                      .catch((err) => console.log(err.response));
                  } else {
                    alert("please add Your comment");
                  }
                }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}> Not Resolved </Text>
              </Pressable>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>
          Similar Issues and Suggestions
        </Text>
      </View>

      {data.suggestionsScore && useFul && (
        <FlatList
          style={{ marginBottom: height / 8 }}
          data={suggestions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {!data.suggestionsScore && (
        <View style={styles.containernew}>
          <Text style={{ textAlign: "justify", fontSize: 22 }}>
            Sorry No Relevent Suggestions to Show Please Dial 119 on your mobile
            for emergency call
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchPlaceSafety")}
            style={styles.loginBtn}
          >
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              <Text style={styles.loginBtnText}>Back Safety home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {!useFul && (
        <View style={styles.containernew}>
          <Text>
            Sorry No more Relevent Suggestions to Show Please Dial 119 on your
            mobile for emergency call
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchPlaceSafety")}
            style={styles.loginBtn}
          >
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              <Text style={styles.loginBtnText}>Back Safety home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>

    // <View>
    //   <Pressable onPress={currentIssues}>
    //     <Text style={styles.head}>Reported NearBy Issues</Text>
    //   </Pressable>
    //   <SafeAreaView>
    //     <FlatList
    //       data={data}
    //       renderItem={renderItem}
    //       keyExtractor={(item) => item.id}
    //     />
    //   </SafeAreaView>
    // </View>
  );
};

export default ShowSafetySuggessions;

const styles = StyleSheet.create({
  listnearby: { margin: 2, marginLeft: 2, borderColor: "red" },
  distance: { fontSize: 16, fontWeight: "bold" },
  IssueType: { fontSize: 20 },
  issue: { fontSize: 20 },
  description: { fontSize: 20 },
  head: { alignSelf: "center", fontWeight: "bold", fontSize: 30 },
  subhead: { alignSelf: "center", fontSize: 25 },
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 70,
  },

  buttonSpace: {
    marginTop: 0,
    marginBottom: 10,
  },
  buttonGredient: {
    borderRadius: 10,
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
  cardStyles: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    width: "100%",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "green",
    shadowOpacity: 1,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: "3%",
  },
  rating: {
    // alignItems: "flex-start",
    marginLeft: "40%",
    // marginTop: height / 100,
    marginRight: width / 3,
  },
  mainBtnContainer: {
    marginTop: "2%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  mainBtn: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#f7797d",
    padding: "3%",
    width: "100%",
    alignItems: "center",
    marginBottom: height / 35,
    marginTop: "1%",
  },
  containernew: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80%",
  },
});
