import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const { height, width } = Dimensions.get("window");

const CardComponent = ({
  fullName,
  image,
  navigation,
  id,
  destination,
  score,
  myReqId,
}) => {
  let destinationName = JSON.parse(destination).destination;
  let percentage = Number(score).toFixed(1);
  console.log("suggested : id", id);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("BuddyDetailsDisplay", {
          id: id,
          myReqid: myReqId,
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cardImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.cardTitle}>{fullName}</Text>
          </View>
          <View style={styles.cardMoreDetails}>
            <View style={styles.locationContainer}>
              <Octicons style={styles.locationIcon} name="location" size={10} />
              <Text style={styles.locationName}>{destinationName}</Text>
            </View>
            <Text>{percentage}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SuggestedBuddies = ({ navigation, route }) => {
  const { myReqId } = route.params;

  console.log("myReqId : ", myReqId);

  const userId = useSelector((state) => state.AuthReducer.userDetails._id);
  const requestDetails = useSelector(
    (state) => state.AuthReducer.requestDetails
  );

  const [suggetsedBuddies, setSuggetstedBuddies] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/buddy/${userId}/${requestDetails.date}/${requestDetails.requestId}`
      )
      .then((result) => {
        console.log(result.data);
        setSuggetstedBuddies(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = ({ item }) => (
    <CardComponent
      fullName={item.requestDetails.userId.fullName}
      image={item.requestDetails.userId.image}
      id={item.requestDetails._id}
      destination={item.requestDetails.destination}
      navigation={navigation}
      score={item.scores.percentage}
      myReqId={myReqId}
    />
  );
  return (
    <View style={styles.container}>
      {suggetsedBuddies.length === 0 ? (
        <View style={styles.noBuddies}>
          <Octicons name="stop" size={70} />
          <Text style={styles.noreqTxt}>
            Sorry! No Buddies on Your Trip Date.
          </Text>
        </View>
      ) : (
        <FlatList
          data={suggetsedBuddies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
};

export default SuggestedBuddies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  SuggestedBuddiesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hrLine: {
    paddingTop: height / 50,
    borderBottomWidth: 0.7,
    marginBottom: height / 70,
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

  detailsBtncontainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
  },
  findBtn: {
    alignItems: "center",
    height: height / 35,
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  findBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  buttonGredient: {
    borderRadius: 10,
    width: "80%",
  },
  cardMoreDetails: {
    paddingHorizontal: width / 46,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationContainer: {
    flexDirection: "row",
  },
  noBuddies: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  noreqTxt: {
    fontSize: 20,
    color: "#f7797d",
    marginTop: "10%",
  },
  nameContainer: {
    width: "100%",
    height: "37%",
  },
  locationIcon: {
    marginTop: "5%",
    marginRight: "3%",
  },
});
