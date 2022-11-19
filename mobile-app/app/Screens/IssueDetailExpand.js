import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");
const IssueDetailExpand = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{data.Issue}</Text>
      <Text style={styles.text}>Type: {data.IssueType}</Text>
      <Text style={styles.text}>Description: {data.description}</Text>
      <Text style={styles.text}>Distance to destination: {data.distance}</Text>
      <Text style={styles.text}>Occured date: {data.date}</Text>
      <Text style={styles.text}>Occured address: {data.address}</Text>

      <Text style={styles.text}>
        User Suggestions: {data.useracceptSuggestion}
      </Text>

      <Text style={styles.text}>
        User Precautions: {data.useracceptPrecaution}
      </Text>

      <Text style={styles.text}>User Comments: {data.userComments}</Text>
    </View>
  );
};

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
    fontSize: 19,
    padding: "2%",
    marginBottom: "2%",
    backgroundColor: "white",
    borderRadius: 9,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: "3%",
    marginLeft: "2%",
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: "3%",
    marginLeft: "2%",
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

/**
 * 
 * <View>
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
 */

export default IssueDetailExpand;
