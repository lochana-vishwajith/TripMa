import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Alert,
  AsyncStorage,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import RadioGroup from "react-native-radio-buttons-group";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../Components/AppLoader";
import {
  GetAvailableBuddies,
  setTripDate,
  showHideAppLoader,
  StoreDestinationDetails,
  tripDate,
} from "../../Store/actions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../Config/environments";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get("window");

const data = [
  {
    id: "1",
    label: "Yes",
    accessibilityLabel: "yes",
  },
  {
    id: "2",
    label: "No",
    accessibilityLabel: "no",
  },
];
const CardComponent = ({ fullName, image, navigation, id, destination }) => {
  let destinationName = JSON.parse(destination).destination;
  console.log("id : ", id);
  return (
    <TouchableOpacity>
      <Pressable
        onPress={() =>
          navigation.navigate("BuddyDetailDisplay", {
            id: id,
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
                <Octicons
                  style={styles.locationIcon}
                  name="location"
                  size={10}
                />
                <Text style={styles.locationName}>{destinationName}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};
const TravelBuddy = ({ navigation }) => {
  const [radioButtons, setRadioButtons] = useState("");
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);
  const [origin, setDestination] = useState();
  const [destination, setDestinationLocation] = useState();

  const dispatch = useDispatch();
  let buddies = [];
  let buddiesnotFound = [];
  let userId = "";

  useEffect(() => {
    dispatch(GetAvailableBuddies());
  }, []);

  buddies = useSelector((state) => state.AuthReducer.buddies);
  userId = useSelector((state) => state.AuthReducer.userDetails._id);
  const isCreated = useSelector(
    (state) => state.AuthReducer.preferenceProfileDetails.preferenceId
  );

  console.log("isceated @ travel buddy : ", isCreated);

  if (buddies) {
    if (buddies.length > 0) {
      buddies.forEach((element) => {
        if (element.isFound === false && element.userId._id !== userId) {
          buddiesnotFound.push(element);
        }
      });
    }
  }

  console.log("buddy : ", buddiesnotFound);

  const renderItem = ({ item }) => (
    <CardComponent
      fullName={item.userId.fullName}
      image={item.userId.image}
      id={item._id}
      destination={item.destination}
      navigation={navigation}
    />
  );

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setDestination : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    setDestinationLocation(details.name);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <TextInput style={styles.searchBox} placeholder="Search a buddy" />
        </View>
        <Formik
          initialValues={{ destination: "", budget: "", tripdate: "" }}
          onSubmit={async (values) => {
            if (isCreated === false || isCreated === undefined) {
              Alert.alert(
                "Failed",
                "Please create a preference profile from More section before requesting a buddy.",
                [
                  {
                    text: "OK",
                  },
                ]
              );
            } else if (values.budget !== "" && values.tripdate !== "") {
              setRegistrationLoading(true);

              const location = {
                origin: origin,
                destination: destination,
              };
              const requestDetails = {
                destination: JSON.stringify(location),
                budget: values.budget,
                tripdate: values.tripdate,
                isPublicTransportUsed: Boolean(radioButtons),
                userId: userId,
              };

              dispatch(StoreDestinationDetails(location));
              await axios
                .post(
                  "https://travel-buddy-research.herokuapp.com/buddy",
                  requestDetails
                )
                .then((result) => {
                  dispatch(GetAvailableBuddies());
                  dispatch(
                    setTripDate({
                      date: values.tripdate,
                      requestId: result.data._id,
                    })
                  );

                  values.budget = "";
                  setDestination("");
                  values.tripdate = "";

                  setRegistrationLoading(false);

                  navigation.navigate("SuggestedBuddies", {
                    myReqId: result.data._id,
                  });
                })
                .catch((err) => {
                  console.log("error ", err);
                  setRegistrationLoading(false);
                });
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={styles.destintionContainer}>
                <View style={styles.destinationLabelcontainer}>
                  <Text style={styles.destinationLabel}>Your Destination</Text>
                </View>
                <View style={styles.locationtxtContainer}>
                  <GooglePlacesAutocomplete
                    placeholder="Destination"
                    fetchDetails
                    onPress={(data, details = null) => {
                      console.log(data, details);
                      onPlaceSelected(details, "origin");
                    }}
                    styles={{ textInput: styles.destinationTextInputLocation }}
                    query={{
                      key: GOOGLE_API_KEY,
                      language: "en",
                    }}
                  />
                </View>
              </View>
              <View style={styles.budgetContainer}>
                <View style={styles.destinationLabelcontainer}>
                  <Text style={styles.destinationLabel}>Expected Budget</Text>
                </View>

                <TextInput
                  style={styles.destinationTextInput}
                  placeholder="Enter your expected budget in Rs"
                  onChangeText={handleChange("budget")}
                  onBlur={handleBlur("budget")}
                  value={values.budget}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.budgetContainer}>
                <View style={styles.destinationLabelcontainer}>
                  <Text style={styles.destinationLabel}>Travel Date</Text>
                </View>

                <TextInput
                  style={styles.destinationTextInput}
                  onChangeText={handleChange("tripdate")}
                  onBlur={handleBlur("tripdate")}
                  placeholder="Enter your travel date"
                  value={values.tripdate}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.TransportContainer}>
                <View style={styles.TransportLabelcontainer}>
                  <Text style={styles.TransportLabel}>
                    Do you wish to use public transport?
                  </Text>
                  <View style={styles.transportraioBtn}>
                    <RadioGroup
                      radioButtons={data}
                      onPress={(e) => {
                        const transportUse = JSON.parse(JSON.stringify(e));
                        e.forEach((use) => {
                          if (use.selected) {
                            setRadioButtons(use.label);
                          }
                        });
                      }}
                      layout="row"
                      size={12}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.findBtnContainer}>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["#FBD786", "#f7797d"]}
                    style={styles.buttonGredient}
                  >
                    <Pressable onPress={handleSubmit} style={styles.findBtn}>
                      <Text style={styles.findBtnText}>Find</Text>
                    </Pressable>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.hrLine} />
        {buddiesnotFound.length > 0 ? (
          <FlatList
            data={buddiesnotFound}
            style={styles.listview}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        ) : (
          <View style={styles.noBuddies}>
            <Text style={styles.noreqTxt}>Sorry! No Pending Buddies.</Text>
          </View>
        )}

        {isUserRegistrationLoading ? <AppLoader /> : null}
      </View>
    </>
  );
};

export default TravelBuddy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  searchBoxContainer: {
    flexDirection: "row",
  },
  searchBox: {
    borderWidth: 0.5,
    width: "100%",
    paddingHorizontal: height / 95,
    borderRadius: 10,
    borderColor: "#f7797d",
  },
  destintionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height / 40,
    marginBottom: 10,
  },
  budgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height / 40,
  },
  TransportContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: height / 40,
  },
  destinationTextInput: {
    backgroundColor: "#C4C4C4",
    padding: 4,
    width: "65%",
    borderRadius: 10,
  },
  destinationLabelcontainer: {
    justifyContent: "center",
  },
  TransportLabelcontainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  TransportLabel: {
    paddingTop: height / 80,
  },
  findBtn: {
    alignItems: "center",
    height: height / 25,
    justifyContent: "center",
    borderRadius: 10,
  },
  findBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonGredient: {
    borderRadius: 10,
    width: width / 6,
  },
  findBtnContainer: {
    alignItems: "flex-end",
    paddingTop: height / 70,
  },
  cardContent: {
    width: width / 3.5,
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
  hrLine: {
    paddingTop: height / 50,
    borderBottomWidth: 0.7,
    marginBottom: height / 70,
  },
  listview: {
    marginBottom: height / 8.5,
  },
  noBuddies: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height / 8.5,
  },
  noreqTxt: {
    fontSize: 20,
    color: "#f7797d",
    marginTop: "10%",
  },
  locationIcon: {
    marginTop: "4%",
    marginRight: "6%",
  },
  destinationTextInputLocation: {
    borderRadius: 10,
    backgroundColor: "#C4C4C4",
    height: height / 20,
  },
  locationtxtContainer: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    width: "100%",
    height: "38%",
  },
});
