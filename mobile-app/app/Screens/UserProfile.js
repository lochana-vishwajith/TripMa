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
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { Rating } from "react-native-ratings";

const ReviewComponent = ({ name, image, review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.buddyReviewContainer}>
        <Avatar.Image source={{ uri: image }} size={22} />
        <Text> | {name}</Text>
      </View>
      <Text style={styles.reviews}>{review}</Text>
      <View style={styles.hrLineReview} />
    </View>
  );
};

const UserProfile = () => {
  const renderItem = ({ item }) => (
    <ReviewComponent
      name={item.reviewedBy.fullName}
      image={item.reviewedBy.image}
      review={item.userReview}
    />
  );

  const [userReviews, setUserReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);

  useEffect(() => {
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/buddyReviews/review/${userDetails._id}`
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

  console.log("user", userDetails);
  const languages = userDetails.skills.replace(/,/g, "\n");

  let age = moment(Date.now()).diff(userDetails.DOB, "years");

  let email = "";
  if (userDetails.email.length > 16) {
    email = userDetails.email.replace(/@/g, "@\n");
  } else {
    email = userDetails.email;
  }

  console.log("occ len : ", userDetails.occupation.length);

  let occupation = "";
  if (userDetails.occupation.length > 11) {
    occupation = userDetails.occupation.replace(/ /g, "\n");
  }
  return (
    <View style={styles.container}>
      <View style={styles.profilePicNameContainer}>
        <View style={styles.profilePicContainer}>
          <Avatar.Image
            source={{ uri: userDetails.image }}
            style={styles.porfileImage}
            size={150}
          />
        </View>
        <Text style={styles.buddyName}>
          {userDetails.fullName} ({age}yrs)
        </Text>
      </View>
      <View style={styles.userDetailssContainer}>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>Email : </Text>
          <Text style={styles.userDetailsValue}>{email}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>Contact No : </Text>
          <Text style={styles.userDetailsValue}>{userDetails.phoneNumber}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>Country : </Text>
          <Text style={styles.userDetailsValue}>{userDetails.country}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>Occupation : </Text>
          <Text style={styles.userDetailsValueOcc}>{occupation}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>Language Skills : </Text>
          <Text style={styles.userDetailsValuelanguage}>{languages}</Text>
        </View>
        <View style={styles.contryContainer}>
          <Text style={styles.userDetailsLabel}>DOB : </Text>
          <Text style={styles.userDetailsValue}>
            {moment(userDetails.DOB).format("YYYY-MM-DD")}{" "}
          </Text>
        </View>
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

      <FlatList
        data={userReviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default UserProfile;

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
  userDetailssContainer: {
    width: "100%",
    height: "14%",
    marginTop: height / 90,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: height / 18,
    alignSelf: "flex-start",
  },
  contryContainer: {
    width: "40%",
    marginVertical: height / 140,
    flexDirection: "row",
  },
  userDetailsLabel: {
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
  reivewStarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },
});
