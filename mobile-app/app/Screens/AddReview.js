import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { Rating, AirbnbRating } from "react-native-ratings";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { IPAddress } from "../Config/commonVariables";

const radioButtonsData = [
  {
    id: "1",
    label: "Buddy",
    value: "Buddy",
  },
  {
    id: "2",
    label: "Attraction",
    value: "Attraction",
  },
  {
    id: "3",
    label: "Route",
    value: "Route",
  },
  {
    id: "4",
    label: "Other",
    value: "Other",
  },
];

const { height, width } = Dimensions.get("window");
const AddReviews = ({ navigation }) => {
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);

  const [userID, setUserID] = useState();
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState();
  const [rating, setRating] = useState(3);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  //var IPAddress = "192.168.1.12";

  useEffect(() => {
    setUserID(userDetails._id);
  }, []);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    const selectedTypeArray = radioButtonsArray.filter((type) => {
      return type.selected == true;
    });
    selectedTypeArray.forEach((element) => {
      const finalType = element.value;
      setFeedbackType(finalType);
      console.log(finalType);
    });

    //console.log("data - ", selectedTypeArray.value);
  }

  const handlerSubmit = () => {
    if (feedback && feedbackType) {
      const finalFeedback = {
        userID: userID,
        feedback: feedback,
        feedbackType: feedbackType,
        date: new Date(),
        rating: rating,
      };
      setSpinnerStatus(true);
      // http://${IPAddress}:5000/feedback/add`
      axios
        .post(
          `https://travel-buddy-research.herokuapp.com/feedback/add`,
          finalFeedback
        )
        .then((res) => {
          console.log("Loading...");
          console.log(res.data);
          if (res.data == "Rejected") {
            setSpinnerStatus(false);
            Alert.alert(
              "Submission Failed",
              "Please enter matching rating and review !",
              [{ text: "OK" }]
            );
          } else {
            setSpinnerStatus(false);
            Alert.alert("Submit Successfully", "Thank you for the review", [
              { text: "OK", onPress: () => navigation.navigate("reviews") },
            ]);
          }
        })
        .catch((err) => console.log(err.response));
    } else {
      setSpinnerStatus(false);
      Alert.alert("Submit Failed", "Select a review type and enter a review", [
        { text: "OK" },
      ]);
    }
  };

  const ratingCompleted = (rate) => {
    setRating(rate);
    console.log("Rating is: " + rating);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: "25%" }}>
        <Spinner
          visible={spinnerStatus}
          textContent={"Analysing review..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View>
          <Text style={{ color: "grey", marginBottom: "2%" }}>
            (Note: Please select a review type, enter a review and submit)
          </Text>
        </View>
        <View>
          <Text style={styles.textFonts}>Review Type</Text>
          <View>
            <RadioGroup
              //  containerStyle="react style"
              containerStyle={{ alignItems: "flex-start" }}
              layout="column"
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              size={10}
            />
          </View>
        </View>

        <View>
          <Text style={styles.textFonts}>Rating</Text>
          <AirbnbRating onFinishRating={(rate) => ratingCompleted(rate)} />
          {/* <Rating
            style={styles.rating}
            type="custom"
            ratingCount={5}
            imageSize={20}
            ratingBackgroundColor="#D8D6D6"
            tintColor="#F3F3F3"
            startingValue={0}
            readonly={true}
          /> */}
        </View>

        <View>
          <Text style={styles.textFonts}>Review</Text>

          <TextInput
            style={styles.inputTxt}
            onChangeText={(e) => setFeedback(e)}
            maxLength={1000}
            multiline={true}
            placeholder="Enter a review"
            textAlignVertical="top"
          />
        </View>
        <View style={styles.addImageButton}>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable onPress={handlerSubmit} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Submit Review</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  text1: {
    fontSize: 42,
    color: "green",
  },
  text2: {
    fontSize: 42,
    color: "pink",
  },
  testInput: {
    backgroundColor: "blue",
    // height: "20%",
    paddingTop: "20%",
  },
  textFonts: {
    fontSize: 20,
  },

  inputTxt: {
    backgroundColor: "#d3d3d3",
    //height: "60%",
    paddingBottom: "40%",
    // marginBottom: "-40%",
    borderColor: "black",
    //paddingBottom: 200,
  },
  addImageButton: {
    marginTop: "5%",
    marginBottom: 10,
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
  rating: {
    // alignItems: "flex-start",
    // marginLeft: width / 70,
    // marginTop: height / 100,
    marginRight: width / 3,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
