import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const CardComponent = ({ title, image, place }) => {
  return (
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardMoreDetails}>
          <View style={styles.locationContainer}>
            <Octicons name="location" size={12} style={styles.locationIcon} />
            <Text style={styles.locationName}>{place}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const StartedCompanionshp = ({ navigation, route }) => {
  const { id } = route.params;

  console.log("started : id ", id);

  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  const buddyDetails = useSelector((state) => state.AuthReducer.buddies);

  let buddy = "";
  let myDetails = "";

  buddyDetails.forEach((element) => {
    if (element.userId._id == userDetails._id) {
      myDetails = element;
    }
  });

  buddyDetails.forEach((element) => {
    if (element.userId._id == id) {
      buddy = element;
    }
  });

  let buddyDestinationName = JSON.parse(buddy.destination).destination;
  let myDestinationName = JSON.parse(myDetails.destination).destination;

  const nameOne = buddy.userId.fullName.split(" ");
  const nameTwo = userDetails.fullName.split(" ");
  return (
    <View style={styles.container}>
      <View style={styles.companionContainer}>
        <CardComponent
          title={buddy.userId.fullName}
          image={buddy.userId.image}
          place={buddyDestinationName}
        />
        <CardComponent
          title={userDetails.fullName}
          image={userDetails.image}
          place={myDestinationName}
        />
      </View>

      <Text style={styles.congratsText}>Congratulations !</Text>
      <Text style={styles.otherText}>
        Have a Safe Trip {nameTwo[0]} & {nameOne[0]}.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyBuddyRequest")}
        style={styles.loginBtn}
      >
        <LinearGradient
          colors={["#FBD786", "#f7797d"]}
          style={styles.buttonGredient}
        >
          <Text style={styles.loginBtnText}>Back to buddy home</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default StartedCompanionshp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    alignItems: "center",
  },
  cardContent: {
    width: width / 2.3,
    height: height / 5,
    marginTop: height / 45,
    borderRadius: 9,
    borderColor: "#f7797d",
    borderWidth: 0.4,
  },
  cardImage: {
    height: height / 8,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  imageContainer: {
    height: height / 8,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  cardMoreDetails: {
    paddingHorizontal: width / 46,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: height / 300,
  },
  companionContainer: {
    height: "29%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: "30%",
  },
  congratsTextContainer: {
    width: "100%",
    height: "15%",

    paddingTop: height / 22,
  },
  congratsText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 20,
  },
  finishButtonContaner: {
    width: "100%",
    height: "40%",
  },

  emailBtnConatent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: width / 40,
  },
  emailBtntxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  emailIcon: {
    paddingHorizontal: width / 70,
    color: "white",
  },
  feedbacktxt: {
    borderWidth: 0.4,
    borderRadius: 9,
    borderColor: "#f7797d",
    padding: 5,
    marginTop: height / 80,
    height: height / 7,
    textAlignVertical: "top",
  },
  feedbackContainer: {
    paddingBottom: height / 30,
    paddingTop: height / 20,
  },
  allcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  locationName: {
    fontSize: 17,
  },
  locationIcon: {
    marginTop: "3%",
    paddingRight: "5%",
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  buttonGredient: {
    borderRadius: 10,
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    width: "100%",
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginTop: "10%",
  },
});
