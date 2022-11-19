import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GetUserDetails, updatePreferenceCreated } from "../../Store/actions";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");

const PreferenceExtraQuestion = ({ route, navigation }) => {
  const [ageVariation, setAgeVariation] = useState(0);
  const [budgetVariation, setBudgetVariation] = useState(0);
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);

  const { preferences, userData } = route.params;

  const dispatch = useDispatch();

  const createProfile = async () => {
    setRegistrationLoading(true);
    const preference = {
      userId: userData._id,
      ageValue: preferences.age,
      languageValue: preferences.language,
      budgetValue: preferences.budget,
      transportValue: preferences.transport,
      ageVariation,
      budgetVariation,
    };

    await axios
      .post(
        "https://travel-buddy-research.herokuapp.com/prefprofile/preference",
        preference
      )
      .then(async (result) => {
        console.log("preference profile created", result.data._id);
        const reqDetails = {
          preferenceId: true,
          preferenceProfileId: result.data._id,
        };
        dispatch(updatePreferenceCreated(reqDetails));
        dispatch(GetUserDetails(userData._id));
        console.log("after dispatch");
        setRegistrationLoading(false);
        navigation.navigate("BuddyScreenDtails");
      })
      .catch((err) => {
        console.log("Preference profile creatio failed", err);
        setRegistrationLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createTxt}>
        Please enter your deviation preference for each factor
      </Text>
      <Text>
        *This values will helps system to find a best matching companion for
        your journey.
      </Text>
      <View style={styles.txtBoxContainer}>
        <View style={styles.txtBoxDetails}>
          <Text style={styles.txtBoxLabel}>
            Deviation value for{"\n"}the budget
          </Text>
          <TextInput
            placeholder="Deviation for budget in Rs."
            keyboardType="decimal-pad"
            onChangeText={(val) => setBudgetVariation(val)}
            style={styles.txtBox}
          />
        </View>
        <View style={styles.txtBoxDetails}>
          <Text style={styles.txtBoxLabel}>
            Deviation value for{"\n"}the age of the partner
          </Text>
          <TextInput
            placeholder="Deviation for age in years."
            keyboardType="decimal-pad"
            onChangeText={(val) => setAgeVariation(val)}
            style={styles.txtBox}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => createProfile()}
        >
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Text style={styles.loginBtnText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {isUserRegistrationLoading ? <AppLoader /> : null}
    </View>
  );
};

export default PreferenceExtraQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  createTxt: {
    fontSize: 18,
    paddingVertical: height / 70,
    fontWeight: "bold",
  },
  txtBoxContainer: {
    paddingVertical: height / 40,
  },
  txtBox: {
    borderWidth: 0.4,
    height: height / 20,
    paddingHorizontal: width / 30,
    borderRadius: 7,
    width: width / 2,
  },
  txtBoxDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height / 20,
  },
  txtBoxLabel: {
    fontSize: 15,
  },
  loginBtn: {
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  buttonGredient: {
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: height / 17,
    flexDirection: "row",
  },
});
