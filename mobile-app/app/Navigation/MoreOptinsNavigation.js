import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import UserProfile from "../Screens/UserProfile";
import MoreOptions from "../Screens/MoreOptions";
import ReviewNavigator from "./ReviewNavigator";
import CurrentCompanionship from "../Screens/CurrentCompanionship";
import PreferenceNavigation from "./PreferenceNavigation";
import MyRequestNavigation from "./MyRequestNavigation";
const Stack = createNativeStackNavigator();

const MoreOptinsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "TripMa-More",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="MoreOptions"
        component={MoreOptions}
        initialParams={{ icon: "heart" }}
      />
      <Stack.Screen
        options={{
          title: "TripMa-Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Reviews"
        component={ReviewNavigator}
      />
      <Stack.Screen
        options={{
          title: "My Companionships",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="currentCompanionship"
        component={CurrentCompanionship}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PreferenceNavigation"
        component={PreferenceNavigation}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MyBuddyRequestNavigation"
        component={MyRequestNavigation}
      />
    </Stack.Navigator>
  );
};

export default MoreOptinsNavigation;

const styles = StyleSheet.create({});
