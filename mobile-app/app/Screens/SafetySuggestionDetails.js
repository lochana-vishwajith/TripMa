import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
const { height, width } = Dimensions.get("window");
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { LinearGradient } from "expo-linear-gradient";

const SafetySuggestionDetails = ({ route, navigation }) => {
  const [description, setDescription] = useState("");

  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}> {data.issueNew} </Text>
        <Text style={styles.text}>
          Suggestion Issue: {data.useracceptSuggestion}
        </Text>
        <Text style={styles.text}>
          Suggestions : {data.useracceptSuggestion}
        </Text>
        <Text style={styles.text}>Precaution:{data.useracceptPrecaution}</Text>
      </View>

      <View style={styles.inputcontainer}>
        <Text style={{ fontSize: 15, marginBottom: "1%" }}>
          Enter Your Comments
        </Text>

        <TextInput
          style={styles.textinputlast}
          onChangeText={setDescription}
          value={description}
          placeholder="description"
          multiline={true}
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          console.log("click");
          const senddata = {
            id: data.id,
            useracceptSuggestion: data.useracceptSuggestion,
            useracceptPrecaution: data.useracceptPrecaution,
            userComments: description,
          };

          console.log(data.id + "meka thama id eka+" + senddata.id);
          console.log("meka thama id eka+" + senddata.useracceptSuggestion);
          console.log("meka thama id eka+" + senddata.useracceptPrecaution);
          console.log("meka thama id eka+" + senddata.userComments);

          if (
            senddata.useracceptSuggestion &&
            senddata.useracceptPrecaution &&
            senddata.userComments &&
            senddata.id
          ) {
            await axios
              .post(
                `http://travel-buddy-research.herokuapp.com/liveIssue/UpdateIssueStatusByUser`,
                senddata
              )
              .then((res) => {
                console.log(res.data);
                alert("Safe Journey");
                navigation.navigate("SearchPlaceSafety");
              })
              .catch((err) => console.log(err.response));
          } else {
            alert("please add Your comment");
          }
        }}
      >
        <LinearGradient
          colors={["#FBD786", "#f7797d"]}
          style={styles.buttonGredient}
        >
          <Text style={styles.findBtnText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
{
  /* <Button
        title="Submit"
        onPress={async () => {
          const senddata = {
            id: data.id,
            useracceptSuggestion: data.descriptions,
            useracceptPrecaution: data.precautions,
            userComments: description,
          };

          if (description) {
            await axios
              .post(
                `http://travel-buddy-research.herokuapp.com/liveIssue/UpdateIssueStatusByUser`,
                senddata
              )
              .then((res) => {
                console.log(res.data.length);
                alert("added");
                //navigation.navigate()
              })
              .catch((err) => console.log(err.response));
          } else {
            alert("please add Your comment");
          }
        }}
      ></Button> */
}
export default SafetySuggestionDetails;

const styles = StyleSheet.create({
  textinputlast: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "100%",
    height: height / 15,
    paddingHorizontal: 10,
    borderColor: "#f7797d",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  text: {
    fontSize: 15,
    padding: "2%",
    marginBottom: "2%",
    backgroundColor: "white",
    borderRadius: 9,
  },
  heading: { fontWeight: "bold", fontSize: 20, marginBottom: "3%" },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: "3%",
  },
  buttonGredient: {
    borderRadius: 10,
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    width: "100%",
  },
  findBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  inputcontainer: {
    padding: "2%",
    marginBottom: "2%",
    backgroundColor: "white",
    borderRadius: 9,
    marginTop: "1%",
  },
});
