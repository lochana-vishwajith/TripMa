import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
const { height, width } = Dimensions.get("window");
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const location = {
  latitude: "7.28952",
  longitude: "80.63279",
};

const NearByIssueList = ({ route, navigation }) => {
  // const data = JSON.parse(route.params.obj12);
  const [nearbyissueslist, setnearbyissueslist] = useState([]);
  const { data } = route.params;

  console.log("apu data near by idan" + data);
  const renderItem = ({ item }) => (
    <Pressable>
      <View style={styles.cardStyles}>
        <View
          style={{ backgroundColor: "white", margin: "2%", paddingLeft: "1%" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Issue</Text>
          <Text style={{ fontSize: 20 }}>{item.IssueType}</Text>
        </View>
        <View style={{ backgroundColor: "white", margin: "2%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>description</Text>
          <Text style={{ fontSize: 20 }}>{item.description}</Text>
        </View>

        <View style={{ backgroundColor: "white", margin: "2%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Precaution</Text>
          <Text style={{ fontSize: 20 }}>{item.useracceptPrecaution}</Text>
        </View>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={async () => {
            let obj = {
              Issue: item.Issue,
              IssueType: item.IssueType,
              description: item.description,
              distance: item.distance,
              date: item.date,
              address: item.address,
              isUserAccept: item.isUserAccept,
              useracceptSuggestion: item.useracceptSuggestion,
            };
            console.log(obj.Issue + "itemto go0000000000000vggg");

            navigation.navigate("NearbyIssueDetail", { data: item });
          }}
        >
          <Text>View More about this</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignContent: "space-around",
            marginTop: 10,
          }}
        ></View>
      </View>
    </Pressable>
  );

  const currentIssues = async () => {
    let obj = {
      origin: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
    };
    axios
      .post(
        `http://travel-buddy-research.herokuapp.com/liveIssue/nearbyissues`,
        obj
      )
      .then((res) => {
        console.log(res.data.length);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonSpace}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable
              onPress={() => {
                const obj = { issueslist: data };
                navigation.navigate("nearbyIssueMap", { data: obj });
              }}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>View Issue Summary</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginBottom: height / 7 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NearByIssueList;

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
    backgroundColor: "#D3D3D3",
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
});

/**import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useState, useEffect } from "react";
import axios from "axios";
import { IPAddress } from "../Config/commonVariables";

const { height, width } = Dimensions.get("window");

const CardComponent = ({
  feedbackID,
  userID,
  feedback,
  feedbackType,
  likes,
  navigation,
  rating,
  refreshLikes,
}) => {
  const likeCount = likes.length;

  //const [likeStatus, setLikeStatus] = useState(false);

  const dislikeFeedback = () => {
    const likeData = {
      userID: userID,
      feedbackID: feedbackID,
    };
    //console.log(likeData);
    axios
      .put(
        "https://travel-buddy-research.herokuapp.com/feedback/dislike",
        likeData
      )
      .then((res) => {
        //console.log("dislike res -", res.data);
        console.log("disliked");
        refreshLikes();
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const likeFeedback = () => {
    const likeData = {
      userID: userID,
      feedbackID: feedbackID,
    };
    //console.log(likeData);
    axios
      .put(
        "https://travel-buddy-research.herokuapp.com/feedback/like",
        likeData
      )
      .then((res) => {
        if (res.data == "already liked") {
          dislikeFeedback();
        } else {
          console.log("liked");
        }

        refreshLikes();
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.cardStyles}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>REVIEW TYPE - </Text>
      <Text style={{ fontSize: 20, marginBottom: "5%", fontStyle: "italic" }}>
        {feedbackType}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>REVIEW - </Text>
      <Text style={{ fontSize: 20, fontStyle: "italic" }}>{feedback}</Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "space-around",
          marginTop: 10,
        }}
      >
        <Pressable onPress={() => likeFeedback()}>
          <FontAwesome name="heart" size={34} color="#f7797d" />
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            marginTop: 5,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          {likeCount}
        </Text>
        <Rating
          style={styles.rating}
          type="custom"
          ratingCount={5}
          imageSize={25}
          ratingBackgroundColor="#D8D6D6"
          tintColor="#F3F3F3"
          startingValue={rating}
          readonly={true}
        />
      </View>
    </View>
  );
};

const Reviews = ({ navigation }) => {
  const [positiveFB, setPositiveFB] = useState();

  // https://travel-buddy-research.herokuapp.com/feedback/positive
  useEffect(() => {
    axios
      .get(`https://travel-buddy-research.herokuapp.com/feedback/positive`)
      .then((res) => {
        //console.log(res.data);
        setPositiveFB(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshLikes = () => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback/positive")
      .then((res) => {
        //console.log(res.data);
        setPositiveFB(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderItem = ({ item }) => (
    <CardComponent
      feedbackID={item._id}
      userID={item.userID}
      feedback={item.feedback}
      feedbackType={item.feedbackType}
      likes={item.likes}
      rating={item.rating}
      refreshLikes={refreshLikes}
      // navigation={navigation}
    />
  );

};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
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
});
 */
