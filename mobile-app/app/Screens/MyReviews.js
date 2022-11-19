import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { useSelector } from "react-redux";
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
        console.log("disliked");
        refreshLikes();
      })
      .catch((err) => console.log(err));
  };

  const likeFeedback = () => {
    const likeData = {
      userID: userID,
      feedbackID: feedbackID,
    };

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

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Feedback",
      "Are you sure you want to delete the feedback",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteFeedback() },
      ]
    );

  const deleteFeedback = () => {
    const deleteData = {
      userID: userID,
      feedbackID: feedbackID,
    };
    console.log(deleteData);
    axios
      .put(
        "https://travel-buddy-research.herokuapp.com/feedback/delete",
        deleteData
      )
      .then((res) => {
        console.log("delete una");
        refreshLikes();
      })
      .catch((err) => console.log(err.message));
    //=============================================================================
    // axios
    //   .put(`http://${IPAddress}:5000/feedback/delete`, deleteData)
    //   .then((res) => {
    //     console.log("delete una");
    //     console.log(res.data);
    //     refreshLikes();
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <View style={styles.cardStyles}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>REVIEW TYPE - </Text>
      <Text style={{ fontSize: 20, marginBottom: "5%", fontStyle: "italic" }}>
        {feedbackType}
      </Text>
      <View style={styles.deleteIcon}>
        <Pressable onPress={() => createTwoButtonAlert()}>
          <MaterialIcons name="delete" size={40} color="red" />
        </Pressable>
      </View>
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

const MyReviews = ({ navigation }) => {
  const [feedback, setFeedback] = useState();
  const [userID, setUserID] = useState();
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  const [refreashPage, setRefreashPage] = useState(false);

  useEffect(() => {
    setUserID(userDetails._id);

    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback")
      .then((res) => {
        var finalFeedback = res.data.filter((fb) => {
          return fb.userID == userDetails._id;
        });
        // console.log("user id - ", userDetails._id);
        console.log("finalFeedback - ", finalFeedback);
        setFeedback(finalFeedback);
        // setFeedback(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const refreshLikes = () => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback/")
      .then((res) => {
        var finalFeedback = res.data.filter((fb) => {
          return fb.userID == userDetails._id;
        });
        setFeedback(finalFeedback);
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
      {feedback ? (
        <FlatList
          style={{ marginBottom: 75 }}
          data={feedback}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No Reviews yet</Text>
      )}
      {/* <FlatList
        style={{ marginBottom: 75 }}
        data={feedback}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
    </View>
  );
};

export default MyReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
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
  deleteIcon: {
    marginLeft: "80%",
    marginTop: "-18%",
    marginBottom: "7%",
  },
});
