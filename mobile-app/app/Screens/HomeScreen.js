import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import Video from "react-native-video";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocationDetials } from "../../Store/actions";

const { height, width } = Dimensions.get("window");
const CardComponent = ({ title, image, navigation, locationName, id }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ViewDetails", { id: id })}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.cardMoreDetails}>
            <View style={styles.locationContainer}>
              <Octicons name="location" size={12} />
              <Text style={styles.locationName}>{locationName}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("ViewDetails")}>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoretext}>See more</Text>
                <Octicons
                  name="chevron-right"
                  size={11}
                  style={styles.seeMoreIcon}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <CardComponent
      title={item.locationName}
      image={item.image}
      navigation={navigation}
      locationName={item.locationPlace}
      id={item._id}
    />
  );

  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/locationDetails/location`
      )
      .then((result) => {
        setLocations(result.data);
        dispatch(setLocationDetials(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.weatherConatiner}
        onPress={() => navigation.navigate("LocationWeather")}
      >
        <Image
          source={require("../assets/QlQV.gif")}
          style={styles.backgroundVideo}
        />
        <Text style={styles.weatherTxt}>Weather</Text>
      </TouchableOpacity> */}
      <Text style={styles.homePageTopic}>Popular places In Sri Lanka</Text>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={styles.homeList}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  homePageTopic: {
    fontSize: 18,
    fontWeight: "bold",
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
  locationContainer: {
    flexDirection: "row",
    marginTop: height / 300,
  },
  cardMoreDetails: {
    paddingHorizontal: width / 46,
  },
  locationName: {
    fontSize: 12,
    marginLeft: width / 60,
  },
  seeMoreContainer: {
    flexDirection: "row",
    marginTop: height / 500,
    marginHorizontal: width / 40,
  },
  seeMoretext: {
    fontSize: 10,
    marginLeft: width / 60,
  },
  seeMoreIcon: {
    marginTop: height / 490,
    marginLeft: width / 90,
  },
  weatherConatiner: {
    width: "100%",
    height: "8%",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  weatherTxt: {
    fontSize: 22,
    fontWeight: "bold",
  },
  backgroundVideo: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 9,
  },
  homeList: {
    marginBottom: height / 8,
  },
});
