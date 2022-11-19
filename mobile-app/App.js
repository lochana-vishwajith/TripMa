// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
enableScreens();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();
import { Provider, useDispatch, useSelector } from "react-redux";

import LoginScreen from "./app/Screens/LoginScreen";
import RegisterScreen from "./app/Screens/RegisterScreen";
import TabNavigator from "./app/Navigation/TabNavigator";
import { store } from "./Store/index";
import { CrowdModalIterate, Init, showLiveUpdateModal } from "./Store/actions";
import AppLoader from "./app/Components/AppLoader";
import AddProfilePic from "./app/Screens/AddProfilePic";
import RealtimeCrowdUpdate from "./app/Components/RealtimeCrowdUpdate";

const MyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        component={LoginScreen}
        name="login"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddProfilePic"
        component={AddProfilePic}
      />
      <Stack.Screen
        name="tabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name="liveUpdates"
        options={{ headerShown: false }}
        component={RealtimeCrowdUpdate}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={LoginScreen}
        name="login"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddProfilePic"
        component={AddProfilePic}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.AuthReducer.authToken);

  console.log("authToken", token);

  const dispatch = useDispatch();

  const init = async () => {
    dispatch(Init());
  };

  useEffect(() => {
    init();
    // CrowdModalIterate();
  }, []);

  let count = 0;

  setInterval(() => {
    dispatch(showLiveUpdateModal());
    count = count + 1;
    console.log(count, " POPUP Test ");
  }, 36000000);

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

export default function App() {
  const [isModalVisible, setModalVisible] = useState(true);
  return (
    <Provider store={store}>
      <RootNavigation />
      <RealtimeCrowdUpdate title="Hello" isVisible={isModalVisible} />
    </Provider>
  );
}
