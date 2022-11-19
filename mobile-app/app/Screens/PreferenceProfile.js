import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";
import { GetUserDetails, SetPreferencesValues } from "../../Store/actions";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");

const CreatePreferenceProfile = () => {
  const isCreated = useSelector(
    (state) => state.AuthReducer.preferenceProfileDetails.preferenceId
  );
  const userDetails = useSelector((state) => state.AuthReducer.userDetails);

  const [agePri, setAgePri] = useState(0);
  const [languagePri, setLanguagePri] = useState(0);
  const [budgetPri, setBudgetPri] = useState(0);
  const [transportPri, setTransportPri] = useState(0);

  const NextPageEnable = (age, language, budget, transport) => {
    console.log(age, language, budget, transport);

    const preferences = {
      age,
      language,
      budget,
      transport,
    };

    Navigation.navigate("PreferenceExtraQuestion", {
      preferences: preferences,
      userData: userDetails,
    });
  };

  return (
    <View style={styles.componentContainer}>
      {isCreated ? (
        <View style={styles.createdContent}>
          <Octicons name="alert" size={80} style={styles.warningIcon} />
          <Text style={styles.cretedTxt}>
            You have already created a preference profile. If you want, you can
            update it at View/Update section.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.createTxt}>
            Please Set the priority for each factor
          </Text>
          <Text style={styles.textForm}>Age of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setAgePri(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{agePri}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Language skills of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setLanguagePri(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{languagePri}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Budget of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setBudgetPri(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{budgetPri}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Transportation meduim</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                onValueChange={(val) => setTransportPri(val)}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{transportPri}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() =>
              NextPageEnable(agePri, languagePri, budgetPri, transportPri)
            }
          >
            <LinearGradient
              colors={["#FBD786", "#f7797d"]}
              style={styles.buttonGredient}
            >
              <Text style={styles.loginBtnText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const UpdatePreferenceProfile = () => {
  let age = "";
  let language = "";
  let budget = "";
  let transport = "";

  const [agePri, setAgePri] = useState(0);
  const [languagePri, setLanguagePri] = useState(0);
  const [budgetPri, setBudgetPri] = useState(0);
  const [transportPri, setTransportPri] = useState(0);
  const [isValueChnaged, setValueChnaged] = useState(false);
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);

  const isCreated = useSelector(
    (state) => state.AuthReducer.preferenceProfileDetails.preferenceId
  );
  console.log("iscreated profile: ", isCreated);

  const preferenceProfile = useSelector(
    (state) => state.AuthReducer.userDetails.preferenceProfileId
  );

  const profId = useSelector(
    (state) =>
      state.AuthReducer.preferenceProfileDetails?.preferenceProfileId?._id
  );

  console.log("profId : ", profId);
  const userId = useSelector((state) => state.AuthReducer.userDetails._id);

  const dispatch = useDispatch();

  let changedValues = [];

  age = preferenceProfile?.ageValue;
  language = preferenceProfile?.languageValue;
  budget = preferenceProfile?.budgetValue;
  transport = preferenceProfile?.transportValue;

  const updateProfile = async (ageV, languageV, budgetV, transportV) => {
    setRegistrationLoading(true);

    let value = [];

    if (ageV !== 0) {
      value.push({ name: "ageValue", value: ageV });
    }

    if (languageV !== 0) {
      value.push({ name: "languageValue", value: languageV });
    }

    if (budgetV !== 0) {
      value.push({ name: "budgetValue", value: budgetV });
    }

    if (transportV !== 0) {
      value.push({ name: "transportValue", value: languageV });
    }

    const chnagedValue = {
      changed: value,
    };

    await axios
      .put(
        `https://travel-buddy-research.herokuapp.com/prefprofile/preference/${profId}`,
        chnagedValue
      )
      .then((res) => {
        dispatch(GetUserDetails(userId));
        setRegistrationLoading(false);
      })
      .catch((err) => {
        console.log("err : ", err);
        setRegistrationLoading(false);
      });
  };

  return (
    <View style={styles.componentContainer}>
      {!isCreated ? (
        <View style={styles.createdContent}>
          <Octicons name="alert" size={80} style={styles.warningIcon} />
          <Text style={styles.cretedTxt}>
            You do not have a preference profile. You need to create it at
            Create section.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.createTxt}>
            After changing the values, please hit the save button to save the
            details.
          </Text>
          <Text style={styles.textForm}>Age of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                value={age}
                onValueChange={(val) => {
                  setAgePri(val);
                  setValueChnaged(true);
                }}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{agePri > 0 ? agePri : age}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Language skills of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                value={language}
                onValueChange={(val) => {
                  setLanguagePri(val);
                  setValueChnaged(true);
                }}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{languagePri > 0 ? languagePri : language}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Budget of the partner</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                value={budget}
                onValueChange={(val) => {
                  setBudgetPri(val);
                  setValueChnaged(true);
                }}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{budgetPri > 0 ? budgetPri : budget}</Text>
            </View>
          </View>
          <Text style={styles.textForm}>Transportation meduim</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderCom}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#f7797d"
                maximumTrackTintColor="#f7797d"
                thumbTintColor="#f7797d"
                step={1}
                value={transport}
                onValueChange={(val) => {
                  setTransportPri(val);
                  setValueChnaged(true);
                }}
              />
            </View>
            <View style={styles.valueContainer}>
              <Text>{transportPri > 0 ? transportPri : transport}</Text>
            </View>
          </View>
          {isValueChnaged ? (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() =>
                updateProfile(agePri, languagePri, budgetPri, transportPri)
              }
            >
              <LinearGradient
                colors={["#FBD786", "#f7797d"]}
                style={styles.buttonGredient}
              >
                <Text style={styles.loginBtnText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </>
      )}
      {isUserRegistrationLoading ? <AppLoader /> : null}
    </View>
  );
};
const renderScene = SceneMap({
  first: CreatePreferenceProfile,
  second: UpdatePreferenceProfile,
});

let Navigation = {};

export default function PreferenceProfile({ navigation, route }) {
  const [index, setIndex] = useState(0);

  Navigation = navigation;

  const [routes] = useState([
    { key: "first", title: "Create" },
    { key: "second", title: "View/Update" },
  ]);
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        style={styles.tabs}
        renderTabBar={(props) => (
          <TabBar
            pressOpacity={0.6}
            activeColor="white"
            inactiveColor="#e0e0e0"
            indicatorStyle={{ backgroundColor: "#f7797d" }}
            style={{ backgroundColor: "#f2f2f2", elevation: 0 }}
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={styles.title}>{route.title}</Text>
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  BtnContainer: {
    width: "100%",
    height: height / 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: height / 50,
  },
  createBtn: {
    borderColor: "#f7797d",
    borderRadius: 20,
    borderWidth: 0.7,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  updateBtn: {
    borderColor: "#f7797d",
    borderRadius: 20,
    borderWidth: 0.7,
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: "77%",
  },
  title: {
    fontSize: 15,
    color: "#f7797d",
  },
  sliderContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  sliderCom: {
    width: "85%",
  },
  createTxt: {
    fontSize: 18,
    paddingVertical: height / 40,
    fontWeight: "bold",
  },
  componentContainer: {
    paddingTop: height / 90,
  },
  valueContainer: {
    alignItems: "center",
    width: "20%",
  },
  textForm: {
    marginVertical: height / 60,
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
  cretedTxt: {
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: height / 25,
    color: "#f7797d",
  },
  createdContent: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  warningIcon: {
    color: "#f7797d",
  },
});
