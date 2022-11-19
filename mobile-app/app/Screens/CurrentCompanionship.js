import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { Avatar, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAvailableBuddies,
  setMyCurrentCompanionships,
} from "../../Store/actions";
import moment from "moment";
import axios from "axios";
import AppLoader from "../Components/AppLoader";
let isApploaderVisible = false;
const { height, width } = Dimensions.get("window");

const extractMyPendingReq = (availableBuddies, userid) => {
  let myRequests = [];
  if (availableBuddies.length > 0) {
    availableBuddies.forEach((element) => {
      if (
        element.companionStatus !== "completed" &&
        !element.endedby.includes(userid)
      ) {
        myRequests.push(element);
      }
    });
  }
  return myRequests;
};
const extractMyCompletedReq = (availableBuddies, userid) => {
  let myRequests = [];
  // console.log("ava", availableBuddies);
  if (availableBuddies.length > 0) {
    availableBuddies.forEach((element) => {
      if (
        element.companionStatus === "completed" ||
        element.endedby.includes(userid)
      ) {
        myRequests.push(element);
      }
    });
  }
  return myRequests;
};

const PendingCardComponent = ({
  destination,
  userImage,
  companionimage,
  id,
  status,
  date,
  dispatch,
  companionId,
  myId,
  item,
}) => {
  const myDestination = JSON.parse(destination).destination;
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [companionReqId, setCompanionReqId] = useState("");
  const [userReview, setUserReview] = useState("");

  const comapnionshipDetails = useSelector(
    (state) => state.AuthReducer.myCompanionships
  );

  console.log("companionship details : ", comapnionshipDetails);

  const endCompanionship = (id) => {
    console.log("id : ", id);
    setIsShow(true);
    setCompanionReqId(id);
  };

  const saveUserReview = async () => {
    console.log("user review added", userReview);
    console.log("my Id", myId);
    console.log("com id", companionId);

    if (userReview === "") {
      Alert.alert("Submission Failed", "Please enter a review !", [
        { text: "OK" },
      ]);
    } else {
      setRegistrationLoading(true);

      const review = {
        userReview: userReview,
        reviewedBy: companionId,
        reviewedTo: myId,
        companionshipId: id,
      };

      await axios
        .post(
          `https://travel-buddy-research.herokuapp.com/buddyReviews/review`,
          review
        )
        .then(async (ressult) => {
          console.log("result : ", ressult.data);

          const userID = {
            reviewedId: companionId,
          };

          await axios
            .put(
              `https://travel-buddy-research.herokuapp.com/companionship/reviewUserId/${id}`,
              userID
            )
            .then((response) => {
              console.log("response : ", response);
              let myIndex = comapnionshipDetails
                .map((value) => value._id)
                .indexOf(id);
              comapnionshipDetails[myIndex].endedby.push(myId);
              dispatch(setMyCurrentCompanionships(comapnionshipDetails));
              setIsShow(false);
              setRegistrationLoading(false);
            })
            .catch((err) => {
              console.log("error : ", err);
              setIsShow(false);
              setRegistrationLoading(false);
            });
        })
        .catch((err) => {
          console.log("err : ", err);
          setIsShow(false);
          setRegistrationLoading(false);
        });
    }
  };

  const deleteRequest = async ({ id, dispatch }) => {
    setRegistrationLoading(true);
    console.log("id", id);
    await axios
      .delete(
        `https://travel-buddy-research.herokuapp.com/companionship/deleteCompanionships/${id}`
      )
      .then((result) => {
        dispatch(GetAvailableBuddies());
        console.log("result ", result);
        setRegistrationLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRegistrationLoading(false);
      });
  };

  console.log("companionid : ", companionId);
  console.log("user id : ", myId);

  return (
    <View>
      <KeyboardAvoidingView>
        <Modal animationType="fade" transparent={true} visible={isShow}>
          <View style={styles.popup}>
            <Text style={styles.popupTopic}>
              Please give a feedback about your travel partner
            </Text>
            <Text>
              * This reviews will help to improve trustworthyness of the users
            </Text>
            <TextInput
              style={styles.reviewTxtIn}
              multiline={true}
              numberOfLines={5}
              placeholder="Feedback about the companion"
              onChangeText={(val) => setUserReview(val)}
            />
            <TouchableOpacity
              style={styles.popupCloseBtn}
              onPress={() => saveUserReview(id)}
            >
              <Text style={styles.popupCloseTxt}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>

      <View style={styles.mainCard} key={id}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Avatar.Image
              source={
                userImage !== null
                  ? { uri: userImage }
                  : require("../assets/kindpng_785975.png")
              }
              size={33}
              style={styles.profilepicContainers}
            />
            <Avatar.Image
              source={
                companionimage
                  ? { uri: companionimage }
                  : require("../assets/kindpng_785975.png")
              }
              size={33}
            />
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.locationContainer}>
              <Octicons name="location" size={15} style={styles.loationIcon} />
              <Text style={styles.optinTxt}>{myDestination} - </Text>
              <Text style={styles.dateTxt}>{date}</Text>
            </View>

            {status === "started" ? (
              <Text style={styles.statusCompleted}>Started</Text>
            ) : (
              <Text style={styles.statusPending}>Pending</Text>
            )}
          </View>
        </View>
        {status === "started" || !item.endedby.includes(myId) ? (
          <View style={styles.endComContainer}>
            <View style={styles.endBtnContiner}>
              <TouchableOpacity
                style={styles.endBtn}
                onPress={() => endCompanionship(id)}
              >
                <Text style={styles.endtxt}>End Companionship</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deleteBtn}>
              <TouchableOpacity
                onPress={() => {
                  deleteRequest({ id, dispatch });
                }}
              >
                <Octicons name="archive" size={15} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.deleteBtn}>
            <TouchableOpacity
              onPress={() => {
                deleteRequest({ id, dispatch });
              }}
            >
              <Octicons name="archive" size={15} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
        {isUserRegistrationLoading ? <AppLoader /> : null}
      </View>
    </View>
  );
};

const CurrentCompanionship = () => {
  const [myCompanionships, setMyCompanionships] = useState([]);
  const dispatch = useDispatch();

  const userImage = useSelector((state) => state.AuthReducer.userDetails.image);
  const userid = useSelector((state) => state.AuthReducer.userDetails._id);
  let requests = useSelector((state) => state.AuthReducer.buddies);

  useEffect(() => {
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/companionship/myCompanionships/${userid}`
      )
      .then((result) => {
        console.log("companion data : ", result.data);
        setMyCompanionships(result.data);
        dispatch(setMyCurrentCompanionships(result.data));
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, []);

  if (requests.length === 0) {
    requests = dispatch(GetAvailableBuddies());
  }

  // let myRequests = [];
  // if (requests.length > 0) {
  //   requests.forEach((element) => {
  //     if (element.userId._id === userid && element.isFound === false) {
  //       myRequests.push(element);
  //     }
  //   });
  // }

  const myAvailableReq = extractMyPendingReq(myCompanionships, userid);
  const myCompleteReq = extractMyCompletedReq(myCompanionships, userid);
  let companionimage = "";

  // console.log("myReq : ", myAvailableReq);

  // console.log(myCompleteReq.userId.image);
  // if (myCompleteReq.length > 0) {
  //   companionimage = myCompleteReq.userId.image;
  // }

  const renderItem = ({ item }) => (
    <PendingCardComponent
      destination={item.requestId.destination}
      userImage={item.companionId.image}
      companionimage={item.userId.image}
      id={item._id}
      status={item.companionStatus}
      date={moment(item.companionStatus.tripdate).format("YYYY-MM-DD")}
      dispatch={dispatch}
      companionId={item.companionId._id}
      myId={item.userId._id}
      item={item}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.pendingContainer}>
        <Text style={styles.pendingBuddiesText}>Pending/Started</Text>
        {myAvailableReq.length > 0 ? (
          <FlatList
            data={myAvailableReq}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        ) : (
          <View style={styles.noReqContainer}>
            <Text style={styles.noReqTxt}>
              No Pending or Started Buddy Requets
            </Text>
          </View>
        )}
      </View>
      <View style={styles.completeContainer}>
        <Text style={styles.completeBuddiesText}>Completed</Text>
        {myCompleteReq.length > 0 ? (
          <FlatList
            data={myCompleteReq}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        ) : (
          <View style={styles.noReqContainer}>
            <Text style={styles.noReqTxt}>No Completed Buddy Requets</Text>
          </View>
        )}
      </View>

      {isApploaderVisible ? <AppLoader /> : null}
    </View>
  );
};

export default CurrentCompanionship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 8,
    flexDirection: "column",
  },
  pendingBuddiesText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "4%",
  },
  completeBuddiesText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "4%",
    marginTop: "4%",
  },
  cardContent: {
    width: "100%",
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "space-between",
    borderLeftWidth: 0.4,
    borderLeftColor: "#f7797d",
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  optinTxt: {
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: "2%",
  },
  imageContainer: {
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: "2%",
  },
  profilepicContainers: {
    marginRight: "3%",
  },
  loationIcon: {
    marginRight: "1.5%",
  },
  status: {
    textAlign: "right",
  },
  locationContainer: {
    flexDirection: "row",
    marginLeft: "3%",
  },
  statusPending: {
    color: "red",
  },
  statusCompleted: {
    color: "green",
  },
  deleteIcon: {
    textAlign: "right",
    marginRight: "3%",
    marginBottom: "2%",
  },
  mainCard: {
    width: "100%",
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    marginBottom: "3%",
    height: "90%",
  },
  noReqTxt: {
    color: "#f7797d",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  completeContainer: {
    flex: 1,
  },
  pendingContainer: {
    flex: 1,
  },
  noReqContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  endBtn: {
    backgroundColor: "red",
    borderRadius: 9,
    alignItems: "center",
  },
  endtxt: {
    color: "white",
    fontWeight: "bold",
    padding: "1.3%",
  },
  endComContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: "1%",
  },
  endBtnContiner: {
    width: "85%",
  },
  popup: {
    alignSelf: "center",
    top: height / 4,
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 40,
  },
  popupTopic: {
    fontSize: 19,
    fontWeight: "bold",
  },
  popupCloseBtn: {
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    width: "70%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
  reviewTxtIn: {
    borderColor: "#f7797d",
    borderWidth: 0.4,
    borderRadius: 9,
    width: "90%",
    marginTop: "6%",
    padding: "3%",
  },
});
