import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Formik } from "formik";
import { Octicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { StoreRegisterDetails } from "../../Store/actions";

const { height, width } = Dimensions.get("window");
const StatusBarHeight = Constants.statusBarHeight;

export default function RegisterScreen({ navigation, route }) {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.regContainer}>
        <Text style={styles.accountRegText}>Register to TripMa</Text>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            DOB: "",
            occupation: "",
            skills: "",
            password: "",
            country: "",
          }}
          onSubmit={async (values) => {
            if (values) {
              // setRegistrationLoading(true);

              const {
                fullName,
                email,
                phoneNumber,
                DOB,
                occupation,
                skills,
                password,
                country,
              } = values;

              const userDetails = {
                fullName: fullName.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                DOB: DOB.trim(),
                occupation: occupation.trim(),
                skills: skills.trim(),
                password: password.trim(),
                country: country.trim(),
              };

              console.log(userDetails);
              dispatch(StoreRegisterDetails(userDetails));
              navigation.navigate("AddProfilePic");
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <Octicons
                  name="person"
                  size={22}
                  style={styles.textIconsName}
                />
                <TextInput
                  placeholder="Your Name"
                  style={styles.textinput}
                  keyboardType={"default"}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="location"
                  size={22}
                  style={styles.textIconsName}
                />
                <TextInput
                  placeholder="Origin"
                  style={styles.textinput}
                  keyboardType={"default"}
                  onChangeText={handleChange("country")}
                  onBlur={handleBlur("country")}
                  value={values.country}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons name="mail" size={22} style={styles.textIconsEmail} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textinput}
                  keyboardType={"email-address"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="device-mobile"
                  size={22}
                  style={styles.textIconsPhone}
                />
                <TextInput
                  placeholder="Your Phone Number"
                  style={styles.textinput}
                  keyboardType={"numeric"}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="calendar"
                  size={22}
                  style={styles.textIconsBday}
                />
                <TextInput
                  placeholder="Your Birthday"
                  style={styles.textinput}
                  keyboardType={"numeric"}
                  onChangeText={handleChange("DOB")}
                  onBlur={handleBlur("DOB")}
                  value={values.DOB}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="briefcase"
                  size={22}
                  style={styles.textIconsOccu}
                />
                <TextInput
                  placeholder="Your Occupation"
                  style={styles.textinput}
                  keyboardType={"default"}
                  onChangeText={handleChange("occupation")}
                  onBlur={handleBlur("occupation")}
                  value={values.occupation}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="comment-discussion"
                  size={22}
                  style={styles.textIconsSkill}
                />
                <TextInput
                  placeholder="Your Language Skills"
                  style={styles.textinput}
                  onChangeText={handleChange("skills")}
                  onBlur={handleBlur("skills")}
                  value={values.skills}
                  multiline
                />
              </View>
              <View style={styles.formItem}>
                <Octicons name="lock" size={22} style={styles.textIconsPass} />
                <TextInput
                  placeholder="Your Password"
                  style={styles.textinput}
                  keyboardType={"default"}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
                <LinearGradient
                  colors={["#FBD786", "#f7797d"]}
                  style={styles.buttonGredient}
                >
                  <Text style={styles.loginBtnText}>Next</Text>
                  <Octicons
                    style={styles.arrowIcon}
                    name="arrow-right"
                    size={25}
                    color="white"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={styles.accBtn}>Alredy Have a Account? Log in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 17,
    paddingTop: StatusBarHeight + 5,
    paddingBottom: height / 13,
  },
  regContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accountRegText: {
    fontSize: 30,
    paddingVertical: height / 35,
    paddingHorizontal: width / 10,
    fontWeight: "bold",
    color: "#f7797d",
  },
  formContainer: {
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
  },
  textinput: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "85%",
    height: height / 22,
    paddingHorizontal: 10,
    borderColor: "#f7797d",
  },
  textarea: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "85%",
    height: "80%",
    paddingHorizontal: 10,
    borderColor: "#f7797d",
    textAlignVertical: "top",
  },
  textIconsName: {
    paddingRight: width / 30,
    color: "#f7797d",
  },
  textIconsEmail: {
    paddingRight: width / 35,
    color: "#f7797d",
  },
  textIconsPhone: {
    paddingRight: width / 23,
    color: "#f7797d",
  },
  textIconsBday: {
    paddingRight: width / 28,
    color: "#f7797d",
  },
  textIconsOccu: {
    paddingRight: width / 30,
    color: "#f7797d",
  },
  textIconsSkill: {
    paddingRight: width / 35,
    color: "#f7797d",
  },
  textIconsPass: {
    paddingRight: width / 25,
    color: "#f7797d",
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
  accBtn: {
    color: "#f7797d",
    fontSize: 13,
    fontStyle: "italic",
  },
  txtarea: {
    flexDirection: "row",
  },
  arrowIcon: {
    paddingTop: "1%",
    paddingLeft: "3%",
  },
});
