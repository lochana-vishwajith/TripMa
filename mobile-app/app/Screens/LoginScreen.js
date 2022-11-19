import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Formik } from "formik";
import { Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAvailableBuddies,
  Login,
  spinnerLoader,
  updatePreferenceCreated,
} from "../../Store/actions";
import AppLoader from "../Components/AppLoader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");
const StatusBarHeight = Constants.statusBarHeight;

export default function LoginScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(GetAvailableBuddies());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/logo.png")}
            style={styles.logoLogin}
          />
          <Text style={styles.motto}>
            Secure & Transparent Mobile Travel Application
          </Text>
        </View>
        <Text style={styles.accountLoginText}>Account Sign-in</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            if (values.email !== "" && values.password !== "") {
              setIsLoading(true);
              const unpw = {
                email: values.email,
                password: values.password,
              };
              await axios
                .post(
                  "https://travel-buddy-research.herokuapp.com/user/login",
                  unpw
                )
                .then(async (loginDetails) => {
                  console.log("loging details : ", loginDetails.status);
                  if (loginDetails) {
                    await AsyncStorage.setItem(
                      "token",
                      loginDetails.data.user.tokens[0].token
                    );
                    const userData = {
                      token: loginDetails.data.user.tokens[0].token,
                      userDetails: loginDetails.data.user,
                    };
                    dispatch(Login(userData));
                    dispatch(
                      updatePreferenceCreated({
                        preferenceId:
                          loginDetails.data.user.preferenceProfileCreated,
                        preferenceProfileId:
                          loginDetails.data.user.preferenceProfileId,
                      })
                    );

                    if (userData.token) {
                      console.log("eeee");
                      navigation.navigate("tabNavigator");
                    }
                  } else {
                    setIsLoading(false);

                    Alert.alert(
                      "User Loging Failed",
                      "Please check the username & password again!",
                      [{ text: "OK" }]
                    );
                  }

                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setIsLoading(false);

                  Alert.alert(
                    "User Loging Failed",
                    "Please check the username & password again!",
                    [{ text: "OK" }]
                  );
                });
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <Octicons name="mail" size={22} style={styles.TextIconsEmail} />
                <TextInput
                  placeholder="Your email"
                  style={styles.textinput}
                  keyboardType={"email-address"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View style={styles.formItem}>
                <Octicons
                  name="lock"
                  size={22}
                  style={styles.TextIconsPassword}
                />
                <TextInput
                  placeholder="Password"
                  style={styles.textinput}
                  secureTextEntry={true}
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
                  <Text style={styles.loginBtnText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.lineView} />
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  navigation.navigate("register");
                }}
              >
                <LinearGradient
                  colors={["#FBD786", "#f7797d"]}
                  style={styles.buttonGredient}
                >
                  <Text style={styles.loginBtnText}>Register</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      {isLoading ? <AppLoader /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: width / 17,
    paddingTop: StatusBarHeight + 5,
    paddingBottom: height / 13,
  },
  logoContainer: {
    height: height / 5,
    width: "100%",
    alignItems: "center",
  },
  logoLogin: {
    height: height / 5.85,
    width: "50%",
  },
  motto: {
    textAlign: "center",
    paddingTop: height / 90,
  },
  accountLoginText: {
    fontSize: 30,
    paddingVertical: height / 35,
    fontWeight: "bold",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height / 30,
  },
  TextIconsEmail: {
    paddingRight: width / 35,
    color: "#f7797d",
  },
  TextIconsPassword: {
    paddingRight: width / 27,
    color: "#f7797d",
  },
  textinput: {
    borderWidth: 1.3,
    borderRadius: 10,
    width: "85%",
    height: height / 22,
    paddingHorizontal: 10,
    borderColor: "#f7797d",
  },
  formContainer: {
    width: "100%",
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
  buttonGredient: {
    borderRadius: 10,
    alignItems: "center",
    height: height / 17,
    justifyContent: "center",
    width: "100%",
  },
  lineView: {
    borderBottomWidth: 1,
    marginVertical: height / 90,
    borderBottomColor: "#b3b0aa",
  },
});
