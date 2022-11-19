import {
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
                navigation.navigate("add_review");
              }}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>Add Reviews</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonSpace}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable
              onPress={() => navigation.navigate("my_review")}
              style={styles.loginBtn}
            >
              <Text style={styles.loginBtnText}>My Reviews</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginBottom: 75 }}
        data={positiveFB}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
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
