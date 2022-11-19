import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import AppLoader from "../Components/AppLoader";
import { GetAvailableBuddies } from "../../Store/actions";
import { Rating } from "react-native-ratings";

let isApploaderVisible = false;

const ReviewComponent = ({ name, image, review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.buddyReviewContainer}>
        <Image source={{ uri: image }} style={styles.reviewPersonImg} />
        <Text> | {name}</Text>
      </View>
      <Text style={styles.reviews}>{review}</Text>
      <View style={styles.hrLineReview} />
    </View>
  );
};

const contactViaEmail = ({ email }) => {
  console.log("contacted");
  Linking.openURL(
    `mailto:${email}?subject=Request to be a travel companion&body=Type your message here`
  );
};

const BuddyDetailDisplay = ({ navigation, route }) => {
  const { id, myReqid } = route.params;
  console.log("ggdd", id, myReqid);
  const [isApploaderVisible, setIsApploaderVisible] = useState(false);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <ReviewComponent
      name={item.reviewedBy.fullName}
      image={item.reviewedBy.image}
      review={item.userReview}
    />
  );

  let buddies = [];
  buddies = useSelector((state) => state.AuthReducer.buddies);
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);
  const userId = useSelector((state) => state.AuthReducer.userDetails._id);
  const [userReviews, setUserReviews] = useState([]);
  const [rating, setRating] = useState(0);

  console.log("userId : ", userId);
  console.log("buddies L: ", buddies);
  let isAvailable = false;
  buddies.filter((user) => {
    if (user.userId._id === userDetails._id) {
      isAvailable = true;
    }
  });

  let buddyDetail = {};
  buddies.filter((element) => {
    if (element._id == id) {
      buddyDetail = element;
    }
  });
  console.log("buddy details : ", buddyDetail);

  useEffect(() => {
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/buddyReviews/review/${buddyDetail.userId._id}`
      )
      .then((result) => {
        console.log("reviews : ", result.data);
        setUserReviews(result.data.reviews);
        setRating(result.data.rating);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  }, []);

  let myUserId = "";

  buddies.filter((element) => {
    if (element.userId._id == userDetails._id) {
      myUserId = element._id;
    }
  });
  const buddyId = buddyDetail.userId._id;

  const languages = buddyDetail.userId.skills.replace(/,/g, "\n");

  let destinationName = JSON.parse(buddyDetail.destination).destination;

  let age = moment(Date.now()).diff(buddyDetail.userId.DOB, "years");

  const StartCompanionshp = async () => {
    console.log("id", buddyId);
    console.log("myUserId", userId);
    if (isAvailable) {
      setIsApploaderVisible(true);
      await axios
        .put(
          `https://travel-buddy-research.herokuapp.com/buddy/${id}/${myReqid}`
        )
        .then(async (result) => {
          const companion = {
            userId: userId,
            companionId: buddyId,
            startDate: moment(),
            requestId: id,
          };
          await axios
            .post(
              "https://travel-buddy-research.herokuapp.com/companionship/companionship",
              companion
            )
            .then((results) => {
              console.log(results.data);
              setIsApploaderVisible(false);
              dispatch(GetAvailableBuddies());
              navigation.navigate("StartedCompanionshp", {
                id: buddyId,
              });
            })
            .catch((err) => {
              console.log("err : ", err);
              setIsApploaderVisible(false);
            });
        })
        .catch((err) => {
          console.log("err : ", err);
          setIsApploaderVisible(false);
        });
    } else {
      Alert.alert(
        "Falied",
        "You must create a buddy request before starting a companionship",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("BuddyScreen"),
          },
        ]
      );
    }
  };

  console.log("buddy ", buddyId);

  return (
    <View style={styles.container}>
      <View style={styles.profilePicNameContainer}>
        <View style={styles.profilePicContainer}>
          <Avatar.Image
            source={{ uri: buddyDetail.userId.image }}
            style={styles.porfileImage}
            size={150}
          />
        </View>
        <Text style={styles.buddyName}>
          {buddyDetail.userId.fullName} ({age}yrs)
        </Text>
      </View>
      <View style={styles.buddyDetailsContainer}>
        <View style={styles.contryContainer}>
          <Text style={styles.buddyDetailLabel}>Country : </Text>
          <Text style={styles.buddyDetailValue}>
            {buddyDetail.userId.country}
          </Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.buddyDetailLabel}>Destination : </Text>
          <Text style={styles.buddyDetailValue}>{destinationName}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.buddyDetailLabel}>Language Skills : </Text>
          <Text style={styles.buddyDetailValuelanguage}>{languages}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.buddyDetailLabel}>Expected Budget : </Text>
          <Text style={styles.buddyDetailValue}>Rs.{buddyDetail.budget} </Text>
        </View>
      </View>
      <View style={styles.emailstartBtnContainer}>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => contactViaEmail({ email: buddyDetail.userId.email })}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <View style={styles.emailBtnConatent}>
              <Text style={styles.emailBtntxt}>Contact via email</Text>
              <Octicons name="mail" size={17} style={styles.emailIcon} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => StartCompanionshp()}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <View style={styles.emailBtnConatent}>
              <Text style={styles.emailBtntxt}>Start Companionship</Text>
              <Octicons name="heart" size={17} style={styles.emailIcon} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.reivewStarContainer}>
        <Text style={styles.reviewTxt}>Reviews</Text>
        <Rating
          style={styles.rating}
          type="custom"
          ratingCount={5}
          imageSize={22}
          ratingBackgroundColor="#D8D6D6"
          tintColor="#F3F3F3"
          readonly={true}
          startingValue={rating}
        />
      </View>
      <View style={styles.hrLine} />

      {userReviews.length > 0 ? (
        <FlatList
          data={userReviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      ) : (
        <View style={styles.noReqContainer}>
          <Text style={styles.noReqTxt}>No Reviews Yet For This User</Text>
        </View>
      )}

      {isApploaderVisible ? <AppLoader /> : null}
    </View>
  );
};

export default BuddyDetailDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  profilePicNameContainer: {
    width: "100%",
    height: "27%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicContainer: {
    width: "45%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  porfileImage: {
    borderRadius: 100,
    overflow: "hidden",
  },
  buddyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: height / 60,
  },
  buddyDetailsContainer: {
    width: "100%",
    height: "14%",
    marginTop: height / 90,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 2,
    alignSelf: "flex-start",
  },
  contryContainer: {
    width: "40%",
    marginVertical: height / 140,
    flexDirection: "row",
  },
  buddyDetailLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  hrLine: {
    paddingTop: height / 50,
    borderBottomWidth: 0.7,
    marginBottom: height / 70,
    width: "100%",
  },
  hrLineReview: {
    paddingTop: height / 50,
    borderBottomWidth: 0.7,
    marginBottom: height / 70,
    width: "100%",
    borderColor: "#f7797d",
  },
  reviewContainer: {
    width: "100%",
  },

  reviewTxt: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "3%",
  },
  reviewPersonImg: {
    height: "22%",
    width: "8%",
    borderRadius: 100,
    overflow: "hidden",
    paddingVertical: width / 30,
  },
  buddyReviewContainer: {
    flexDirection: "row",
  },
  reviews: {
    fontSize: 10,
  },
  flatList: {
    marginBottom: 75,
  },
  buttonGredient: {
    borderRadius: 10,
  },
  emailBtntxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  emailBtnConatent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: width / 40,
  },
  emailIcon: {
    paddingHorizontal: width / 70,
    color: "white",
  },
  emailstartBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  noReqContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noReqTxt: {
    color: "#f7797d",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  reivewStarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: "3%",
  },
});
