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
  Pressable,
  TouchableOpacity,
  Modal,
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

const ShowLocationPoint = ({ route, navigation }) => {
  const { data } = route.params;
  const matrixObj = data.obj;

  // const obj = route.params.objects;
  const formatTime = moment(data.time, "h:mm:ss A").format("HH:mm:ss");
  const formatedDate = moment(data.date).format("YYYY-MM-DD");

  const [modelpopup, setmodelpopup] = useState(true);
  const [selectedValue, setselectedValue] = useState("");
  const [location, setLocation] = useState(null);
  const [issueType, setIssueType] = useState("medical");
  const [issuerating, setIssueRating] = useState("high");
  const [suggestions, setSuggestions] = useState(null);
  const [description, setDescription] = useState(null);
  const [Issue, setIssue] = useState(null);
  const [addL, setaddL] = useState(true);
  const [IsgetcurrentLocation, setIsgetCurrentLocation] = useState(false);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [displaymode, setMode] = useState("date");
  const [isDisplayDate, setShow] = useState(false);
  const [time, setTime] = useState();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.subheading}>~Time & Place Details~</Text>
      </View>
      <View style={styles.col1}>
        <Text style={{ fontSize: 14 }}>Date - {formatedDate}</Text>
        <Text style={{ fontSize: 14 }}>Time - {formatTime}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={{ fontSize: 16 }}>Address - {data.addr}</Text>
      </View>
      <View style={styles.col1}></View>
      <View></View>
      <View>
        <View>
          <Text style={styles.subheading}>~Issue Specific details~</Text>
        </View>
        <View>
          <Text style={styles.text}>Issue</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={setIssue}
            value={Issue}
            placeholder="Issue"
            multiline={true}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Select Issue Type</Text>

          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setIssueType(itemValue)}
          >
            <Picker.Item label="Medical" value="medical" />
            <Picker.Item label="Security" value="security" />
            <Picker.Item label="Transport" value="transport" />
            <Picker.Item label="Accommodation" value="accommodation" />
            <Picker.Item label="Fuel" value="fuel" />
          </Picker>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.text}>Select Issue Rating Type</Text>

        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 120 }}
          onValueChange={(itemValue, itemIndex) => setIssueRating(itemValue)}
        >
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
        </Picker>
      </View>

      <View>
        <View>
          <Text style={styles.text}>Description</Text>

          <TextInput
            style={styles.textinputlast}
            onChangeText={setDescription}
            value={description}
            placeholder="description"
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </View>
      <Spinner
        visible={spinnerStatus}
        textContent={"Analyzing the Suggestions"}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.buttonCon}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            console.log("hiiiii");
            let obj = {
              location: {
                latitude: data.location.latitude,
                longitude: data.location.longitude,
              },
              address: data.addr,
              IssueType: issueType,
              IssueRating: issuerating,
              Issue: Issue,
              description: description,
              date: formatedDate,
              time: formatTime,
            };
            console.log(obj, "Saving object");
            if (
              issueType &&
              issuerating &&
              Issue &&
              description &&
              formatedDate &&
              formatTime
            ) {
              setSpinnerStatus(true);
              axios
                .post(
                  "http://travel-buddy-research.herokuapp.com/liveIssue/add",
                  obj
                )
                .then((res) => {
                  setSpinnerStatus(false);

                  let obj = res.data;
                  navigation.navigate("Livesuggestions", { data: obj });
                })
                .catch((err) => console.log(err));
            } else {
              alert("Please Fill all the Values");
            }
          }}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Text style={styles.loginBtnText}>GET SUGGESTIONS</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <Modal animationType="fade" transparent={true} visible={modelpopup}>
          <View style={styles.popup}>
            <Text style={styles.popupTopic}>
              Select the Risk types as follows:
            </Text>
            <Text>
              **Medical - Drug shortages , Spreading diseases injuries
            </Text>
            <Text>**Transport - transportation related </Text>
            <Text>**Issues Fuel -Fuel related problems</Text>
            <Text>
              **Accormadation -Accomadation and food related problems.
            </Text>
            <Text>**Security -Threfts ,criminals, harrasments</Text>
            <TouchableOpacity
              style={styles.popupCloseBtn}
              onPress={() => {
                console.log("close");
                setmodelpopup(false);
              }}
            >
              <Text style={styles.popupCloseTxt}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginTop: "10%",
  },
  scrollView: {
    marginBottom: 90,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
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
    height: height / 15,
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
  buttonGredient: {
    borderRadius: 10,
    width: "100%",
  },
  col1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "3%",
  },
  col2: { alignItems: "center" },
  subheading: {
    fontWeight: "bold",
    fontSize: 17,
  },
  popup: {
    alignSelf: "center",
    top: height / 4,
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 40,
  },
  popupTopic: {
    fontSize: 19,
    fontWeight: "bold",
  },
  popupCloseBtn: {
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    width: "70%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
  reviewTxtIn: {
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    width: "90%",
    marginTop: "6%",
    padding: "3%",
  },
  popupCloseBtn: {
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    width: "70%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
});
export default ShowLocationPoint;
