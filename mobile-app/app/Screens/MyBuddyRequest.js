import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Octicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Alert } from "react-native";
import {
  GetAvailableBuddies,
  setMyBuddyRequests,
  setMyRequests,
  setTripDate,
} from "../../Store/actions";
import AppLoader from "../Components/AppLoader";

const CardComponent = ({
  destination,
  isFound,
  tripDate,
  budget,
  requestId,
  userId,
  createdAt,
  navigation,
  dispatch,
  setLoader,
}) => {
  const destinationLocation = JSON.parse(destination).destination;
  const noOfDays = moment().diff(createdAt, "days");
  const myRequest = useSelector((state) => state.AuthReducer.myRequests);

  const deleteRequest = async (requestId) => {
    setLoader(true);
    console.log("req : ", myRequest);
    try {
      await axios
        .delete(
          `https://travel-buddy-research.herokuapp.com/buddy/request/${requestId}`
        )
        .then((result) => {
          dispatch(GetAvailableBuddies());
          const myReqIndex = myRequest.findIndex(
            (request) => request._id === requestId
          );
          const updatedRequests = myRequest.splice(myReqIndex, 1);
          dispatch(setMyBuddyRequests(updatedRequests));
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const findBuddies = (requestId, tripdate) => {
    console.log("Find buddy method invoked");
    dispatch(
      setTripDate({
        date: tripdate,
        requestId: requestId,
      })
    );
    navigation.navigate("SuggestedBuddiesMyReq", { myReqId: requestId });
  };
  return (
    <View style={styles.cardContent}>
      <View style={styles.tripDetails}>
        <View style={styles.locationContainer}>
          <Octicons style={styles.locationIcon} name="location" size={20} />
          <Text style={styles.destinationTxt}>{destinationLocation}</Text>
        </View>
        <View style={styles.otherDetailsContainer}>
          <Text style={styles.topicTxt}>
            Trip Date : {moment(tripDate).format("YYYY-MM-DD")}
          </Text>
          <Text style={styles.topicTxt}>Trip Budget : RS.{budget}</Text>
          {isFound ? (
            <Text style={styles.topicTxtStatusCom}>Completed</Text>
          ) : (
            <Text style={styles.topicTxtStatusPen}>Pending</Text>
          )}
          {noOfDays === 0 ? (
            <Text style={styles.topicTxtDays}>Today</Text>
          ) : (
            <Text style={styles.topicTxtDays}>{noOfDays} days ago</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          {isFound ? null : (
            <TouchableOpacity
              onPress={() =>
                findBuddies(requestId, moment(tripDate).format("YYYY-MM-DD"))
              }
            >
              <LinearGradient
                colors={["#FBD786", "#f7797d"]}
                style={styles.buttonGredient}
              >
                <Text style={styles.findBtnText}>Find Buddies</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteRequest(requestId)}
        >
          <Octicons name="archive" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MyBuddyRequest = ({ navigation }) => {
  const [myRequests, setMyRequests] = useState([]);
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);

  const userId = useSelector((state) => state.AuthReducer.userDetails._id);

  const dispatch = useDispatch();

  useEffect(() => {
    setRegistrationLoading(true);
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/buddy/myRequest/${userId}`
      )
      .then((result) => {
        console.log(result.data);
        setMyRequests(result.data);
        dispatch(setMyBuddyRequests(result.data));
        setRegistrationLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetching requests : ", err);
        setRegistrationLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <CardComponent
      budget={item.budget}
      destination={item.destination}
      isFound={item.isFound}
      tripDate={item.tripdate}
      key={item._id}
      requestId={item._id}
      userId={item.userId._id}
      createdAt={item.createdAt}
      navigation={navigation}
      dispatch={dispatch}
      setLoader={setRegistrationLoading}
    />
  );

  return (
    <View style={styles.container}>
      {myRequests.length === 0 ? (
        <View style={styles.noBuddies}>
          <Octicons name="stop" size={70} />
          <Text style={styles.noreqTxt}>
            Sorry! You don't have any requests. You can create a new buddy
            request in Buddy section.
          </Text>
        </View>
      ) : (
        <FlatList
          data={myRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
      {isUserRegistrationLoading ? <AppLoader /> : null}
    </View>
  );
};

export default MyBuddyRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 8,
  },
  cardContent: {
    width: width / 2.3,
    height: height / 5,
    marginTop: height / 45,
    borderRadius: 9,
    borderColor: "#f7797d",
    borderWidth: 0.4,
  },
  tripDetails: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    padding: "10%",
  },
  buttonContainer: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    padding: "7%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2%",
  },

  locationContainer: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    flexDirection: "row",
    justifyContent: "center",
  },
  destinationTxt: {
    fontSize: 20,
    marginLeft: "5%",
    fontWeight: "bold",
  },
  locationIcon: {
    marginTop: "2%",
  },
  otherDetailsContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    marginTop: "2%",
  },
  topicTxt: {
    fontSize: 13,
  },
  topicTxtStatusCom: {
    fontSize: 13,
    color: "green",
  },
  topicTxtStatusPen: {
    fontSize: 13,
    color: "red",
  },
  topicTxtDays: {
    fontStyle: "italic",
    fontSize: 10,
  },
  buttonGredient: {
    borderRadius: 10,
    width: "100%",
    padding: "2%",
    paddingHorizontal: "12%",
  },
  findBtn: {
    alignItems: "center",
    height: height / 30,
    justifyContent: "center",
    borderRadius: 10,
  },
  findBtnText: {
    color: "white",
    fontWeight: "bold",
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
    justifyContent: "center",
    textAlign: "center",
  },
});
