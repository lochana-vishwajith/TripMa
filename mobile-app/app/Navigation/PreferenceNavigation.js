import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import PreferenceProfile from "../Screens/PreferenceProfile";
import PreferenceExtraQuestion from "../Screens/PreferenceExtraQuestion";
import TravelBuddy from "../Screens/TravelBuddy";
import SuggestedBuddies from "../Screens/SuggestedBuddies";
import BuddyDetailDisplay from "../Screens/BuddyDetailDisplay";
import StartedCompanionshp from "../Screens/StartedCompanionshp";
import MyBuddyRequest from "../Screens/MyBuddyRequest";

const Stack = createNativeStackNavigator();

const PreferenceNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Preference Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="PreferencesProfile"
        component={PreferenceProfile}
      />
      <Stack.Screen
        options={{
          title: "Preference Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        initialParams={{ preferences: {}, userData: {} }}
        name="PreferenceExtraQuestion"
        component={PreferenceExtraQuestion}
      />
      <Stack.Screen
        options={{
          title: "Travel Buddy",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="BuddyScreenDtails"
        component={TravelBuddy}
      />
      <Stack.Screen
        options={{
          title: "Suggested Buddies",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="SuggestedBuddies"
        initialParams={{ myReqId: "" }}
        component={SuggestedBuddies}
      />
      <Stack.Screen
        options={{
          title: "Travel Buddy|Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        initialParams={{ id: "" }}
        name="BuddyDetailsDisplay"
        component={BuddyDetailDisplay}
      />
      <Stack.Screen
        options={{
          title: "Companionship",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        initialParams={{ id: "" }}
        name="StartedCompanionshp"
        component={StartedCompanionshp}
      />
      <Stack.Screen
        options={{
          title: "My Requests",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="MyBuddyRequest"
        component={MyBuddyRequest}
      />
    </Stack.Navigator>
  );
};

export default PreferenceNavigation;

const styles = StyleSheet.create({});
