import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MyBuddyRequest from "../Screens/MyBuddyRequest";
import SuggestedBuddies from "../Screens/SuggestedBuddies";
import BuddyDetailDisplay from "../Screens/BuddyDetailDisplay";
import StartedCompanionshp from "../Screens/StartedCompanionshp";

const Stack = createNativeStackNavigator();

const MyRequestNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "My Requests",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="MyBuddyRequest"
        component={MyBuddyRequest}
      />
      <Stack.Screen
        options={{
          title: "Suggested Buddies",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="SuggestedBuddiesMyReq"
        initialParams={{ myReqId: "" }}
        component={SuggestedBuddies}
      />
      <Stack.Screen
        options={{
          title: "Travel Buddy|Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        initialParams={{ id: "", myReqid: "" }}
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
    </Stack.Navigator>
  );
};

export default MyRequestNavigation;

const styles = StyleSheet.create({});
