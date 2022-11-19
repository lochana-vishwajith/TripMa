import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../Config/environments";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");

const imageData = [
  {
    id: 1,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/72/b6/a6/ravana-s-cave.jpg?w=2000&h=-1&s=1",
  },
  {
    id: 2,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/b2/8d/76/ravana-s-cave.jpg?w=2000&h=-1&s=1",
  },
  {
    id: 3,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/15/c5/a6/good-view-of-little-adams.jpg?w=1400&h=-1&s=1",
  },
];

const imageData1 = [
  {
    id: 1,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/14/47/05/dsc-3121-largejpg.jpg?w=1400&h=-1&s=1",
  },
  {
    id: 2,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/14/47/02/dsc-3055-largejpg.jpg?w=1400&h=-1&s=1",
  },
  {
    id: 3,
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/14/46/ff/dsc-3043-largejpg.jpg?w=1400&h=-1&s=1",
  },
];

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.saltinourhair.com%2Fsri-lanka%2Fmirissa%2F&psig=AOvVaw2iq4JNke9EFrNH_rYCa67A&ust=1650776719348000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPCe6NG0qfcCFQAAAAAdAAAAABAD",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d723",
    name: "Fourth Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    name: "Fifith Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d725",
    name: "Seventh Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d726",
    name: "eigth Item",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

const timeData = {
  labels: ["8-10", "10-12", "12-14", "14-16", "16-18", "18-20", "20-24"],
  datasets: [{ data: [5, 10, 7, 20, 15, 2, 1] }],
};

const chartConfig = {
  backgroundColor: "#F3F3F3",
  backgroundGradientFrom: "#F3F3F3",
  backgroundGradientTo: "#F3F3F3",
  color: (opacity = 1) => `rgba(255, 67, 92, ${opacity})`,
};
const graphStyle = {
  marginVertical: 4,
};

const ReviewComponent = ({ name, image, review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.buddyReviewContainer}>
        <Image
          source={require("../assets/anuradhapura-sri-lanka.jpg")}
          style={styles.reviewPersonImg}
        />
        <Text> | {name}</Text>
      </View>
      <Text style={styles.reviews}>{review}</Text>
      <View style={styles.hrLineReview} />
    </View>
  );
};

const AttractionDetails = ({ navigation, route }) => {
  const { data } = route.params;
  console.log("Passed data set:", data);
  const dispatch = useDispatch();
  const preferences = useSelector(
    (state) => state.AuthReducer.attractionPreferences
  );
  console.log("Preferences:", preferences);
  let dataSet;
  const [analysis, setAnalysis] = useState({});
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission Error");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/liveCrowd/${data.geometry.location.lat}/${data.geometry.location.lng}/${preferences.crowd}/${preferences.weather}`
      )
      .then((resulr) => {
        setAnalysis(resulr.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.coords.latitude}%2C${location.coords.longitude}&destinations=${data.geometry.location.lat}%2C${data.geometry.location.lng}&key=${GOOGLE_API_KEY}`
      )
      .then((res) => {
        console.log(
          "Distance lat lng ",
          location.coords.latitude,
          " ",
          location.coords.longitude,
          " ",
          data.geometry.location.lat,
          " ",
          data.geometry.location.lng
        );
        console.log("Distance", res.data.rows[0].elements[0]["duration"].text);
        setDistance(res.data.rows[0].elements[0]["distance"].text);
        setDuration(res.data.rows[0].elements[0]["duration"].text);
      })
      .catch((err) => console.log(err));

    setSpinnerStatus(false);
  }, []);

  const renderItems = ({ item }) => (
    <Image source={{ uri: item.url }} style={styles.images} />
  );

  const renderReviews = ({ item }) => (
    <ReviewComponent name={item.name} image={item.image} review={item.review} />
  );
  return (
    <View style={styles.container}>
      {/* <View style={styles.visitTimeContainer}>
        <View style={styles.visitTopic}>
          <Text style={styles.visitTopicText}>
            Best Time to Visit {data.name}
          </Text>
        </View>
        <View style={styles.visitDataContainer}>
          <View style={styles.visitData}>
            <Text style={styles.visitDataText}>Crowdedness</Text>
            <Text style={styles.visitDataText1}>{analysis.crowd}</Text>
          </View>
          <View style={styles.visitData}>
            <Text style={styles.visitDataText}>Weather Condition</Text>
            <Text style={styles.visitDataText2}>{analysis.weather}</Text>
          </View>
          <View style={styles.visitData}>
            <Text style={styles.visitDataText}>Status</Text>
            <Text style={styles.visitDataText3}>{analysis.status}</Text>
          </View>
          <View style={styles.visitData}>
            <Text style={styles.visitDataText}>Visit Now</Text>
            {analysis.visitNo > analysis.visitYes ? (
              <Text style={styles.visitDataText4}>
                {analysis.visitNo} says NO
              </Text>
            ) : (
              <Text style={styles.visitDataText4}>
                {analysis.visitYes} says YES
              </Text>
            )}
          </View>
          <View style={styles.visitData}>
            <Text style={styles.visitDataText}>Distance</Text>
            <Text style={styles.visitDataText5}>{distance}</Text>
          </View>
        </View>
        <View style={styles.percentage}>
          <Text style={styles.percentageText}>
            It's {analysis.totalScore}% Okay Visit Now
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("futureCrowd", { loc: data });
                }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>See Crowd Predictions</Text>
              </Pressable>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}
      {/* <View style={styles.chartView}>
          <BarChart
            style={graphStyle}
            data={timeData}
            width={width / 1.05}
            height={height / 4}
            chartConfig={chartConfig}
          />
        </View> */}
      {/* </View> */}
      {/* {data.name == "Ravana's Cave" ?(
        <View style={styles.placeDetailContainer}>
        <View style={styles.galleryContainer}>
          <FlatList
            data={imageData}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        </View>
        ):(
        <View style={styles.placeDetailContainer}>
        <View style={styles.galleryContainer}>
          <FlatList
            data={imageData1}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        </View>
      )} */}

      {/* <View>
          <Text style={styles.reviewText}>Reviews</Text>
          <FlatList
            data={DATA}
            renderItem={renderReviews}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        </View> */}
      {/* </View> */}
      {/* <View style={styles.container}> */}
      <Text style={styles.topicTxt}>Best Time to Visit {data.name}</Text>
      {/* {matrixObj && ( */}
      <View style={styles.scoreContainer}>
        <View style={styles.totalTxtCon}>
          <Text style={styles.totaltxt}>Total Visiting Index</Text>
          <Text style={styles.totalpercentage}>
            {analysis.totalScore === null ? 0 : analysis.totalScore}%
          </Text>
        </View>
        {analysis.crowd == "unpredectable" ?<View style={styles.noData}>
        <Text style={styles.noDataText}>Sorry, No Enough Data to Predictions...</Text>
        </View> :<View style={styles.otherPerce}>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Crowdedness</Text>
            <Text style={styles.otherVal}>{analysis.crowd}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Weather Condition</Text>
            <Text style={styles.otherVal}>{analysis.weather}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Visit Now?</Text>
            {analysis.visitNo > analysis.visitYes ? (
              <Text style={styles.otherVal}>{analysis.visitNo} says NO</Text>
            ) : (
              <Text style={styles.otherVal}>{analysis.visitYes} says YES</Text>
            )}
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Status</Text>
            <Text style={styles.otherVal}>{analysis.status}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Distance</Text>
            <Text style={styles.otherVal}>{distance}</Text>
          </View>
        </View>}
        {/* <View style={styles.otherPerce}>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Crowdedness</Text>
            <Text style={styles.otherVal}>{analysis.crowd}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Weather Condition</Text>
            <Text style={styles.otherVal}>{analysis.weather}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Visit Now?</Text>
            {analysis.visitNo > analysis.visitYes ? (
              <Text style={styles.otherVal}>{analysis.visitNo} says NO</Text>
            ) : (
              <Text style={styles.otherVal}>{analysis.visitYes} says YES</Text>
            )}
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Status</Text>
            <Text style={styles.otherVal}>{analysis.status}</Text>
          </View>
          <View style={styles.otherPerceVal}>
            <Text style={styles.otherTxt}>Distance</Text>
            <Text style={styles.otherVal}>{distance}</Text>
          </View>
        </View> */}
      </View>

      <View>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("futureCrowd", { loc: data });
              }}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>See Crowd Predictions</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {isLoading ? <AppLoader /> : null}
    </View>
  );
};

export default AttractionDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: width / 45,
//     paddingTop: height / 60,
//   },
//   visitTimeContainer: {
//     width: "100%",
//     height: "50%",
//     // justifyContent: "center",
//     // alignItems: "center",
//     borderColor: "#f7797d",
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   visitTopic: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 8,
//   },
//   visitTopicText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   visitDataContainer: {
//     justifyContent: "space-evenly",
//     alignItems: "flex-start",
//     marginLeft: width / 10,
//     marginTop: 15,
//   },
//   visitData: {
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     marginHorizontal: width / 10,
//     flexDirection: "row",
//     alignContent: "center",
//     fontSize: 20,
//   },
//   visitDataText: {
//     fontSize: 20,
//     marginLeft: width / -12,
//   },
//   visitDataText1: {
//     marginLeft: width / 5,
//     fontSize: 20,
//     textTransform:"uppercase"
//   },
//   visitDataText2: {
//     marginLeft: width / 10,
//     fontSize: 20,
//     textTransform:"uppercase"
//   },
//   visitDataText3: {
//     marginLeft: width / 2.75,
//     fontSize: 20,
//     textTransform:"uppercase"
//   },
//   visitDataText4: {
//     marginLeft: width / 3.4,
//     fontSize: 20,
//   },
//   visitDataText5: {
//     marginLeft: width / 3.2,
//     fontSize: 20,
//   },
//   placeDetailContainer: {
//     width: "100%",
//     height: "33%",
//     borderColor: "#f7797d",
//     borderWidth: 1,
//     borderRadius: 10,
//     marginTop: height / 60,
//   },
//   images: {
//     width: width / 1.05,
//     height: height / 2.5,
//     resizeMode: "cover",
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//   },
//   chartView: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   // reviewContainer: {},
//   reviewText: {
//     fontSize: 15,
//     fontWeight: "bold",
//     marginLeft: width / 50,
//     marginTop: height / 80,
//   },
//   hrLineReview: {
//     paddingTop: height / 50,
//     borderBottomWidth: 0.7,
//     marginBottom: height / 70,
//     width: "100%",
//     borderColor: "#f7797d",
//   },
//   reviewContainer: {
//     width: "100%",
//     padding: 5,
//     height: height / 10,
//   },

//   reviewTxt: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   reviewPersonImg: {
//     height: "22%",
//     width: "8%",
//     borderRadius: 100,
//     overflow: "hidden",
//     paddingVertical: width / 30,
//   },
//   buddyReviewContainer: {
//     flexDirection: "row",
//   },
//   reviews: {
//     fontSize: 10,
//   },
//   percentage: {
//     alignSelf: "center",
//     marginTop: 15,
//   },
//   percentageText: {
//     fontSize: 18,
//   },
//   loginBtn: {
//     alignItems: "center",
//     height: height / 17,
//     justifyContent: "center",
//     borderRadius: 10,
//   },
//   loginBtnText: {
//     fontSize: 17,
//     fontWeight: "bold",
//     color: "white",
//   },
//   buttonGredient: {
//     borderRadius: 10,
//     marginTop: 10,
//     width: width / 1.2,
//     alignSelf: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 8,
  },
  topicTxt: {
    fontSize: 20,
    alignSelf: "center",
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
    marginTop: "5%",
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
    textTransform: "uppercase",
    fontWeight: "bold",
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
  noData:{
    alignItems:"center",
    marginTop:"5%"
  },
  noDataText:{
    fontSize: 30,
    fontWeight: "bold",
    color:"red"
  }
});
