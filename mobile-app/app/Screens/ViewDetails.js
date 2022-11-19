import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("window");

const ViewDetails = ({ route }) => {
  const { id } = route.params;
  console.log("id", id);

  const locationArray = useSelector(
    (state) => state.AuthReducer.locationDetails
  );

  const location = locationArray.filter((value) => value._id === id)[0];
  console.log("location : ", location);

  return (
    <View style={styles.container}>
      <View style={styles.imageConatiner}>
        <Image source={{ uri: location.image }} style={styles.locationImage} />
      </View>
      <View style={styles.locationDetailsCon}>
        <Text style={styles.locationName}>{location.locationName}</Text>
        <Text style={styles.locationSitu}>{location.locationPlace}</Text>
      </View>
      <ScrollView style={styles.descriptionScroll}>
        <Text style={styles.locationDescription}>{location.description}</Text>
      </ScrollView>
    </View>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    paddingBottom: "30%",
  },
  imageConatiner: {
    width: "100%",
    height: "40%",
    elevation: 15,
    borderRadius: 9,
  },
  locationImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  locationName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  locationDescription: {
    fontSize: 18,
    textAlign: "justify",
  },
  locationSitu: {
    fontSize: 16,
  },
  locationDetailsCon: {
    marginVertical: "3%",
  },
  descriptionScroll: {
    width: "100%",
    height: "60%",
  },
});
