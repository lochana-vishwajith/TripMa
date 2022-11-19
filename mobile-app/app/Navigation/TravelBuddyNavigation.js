import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import TravelBuddy from "../Screens/TravelBuddy";
import BuddyDetailDisplay from "../Screens/BuddyDetailDisplay";
import SuggestedBuddies from "../Screens/SuggestedBuddies";
import StartedCompanionshp from "../Screens/StartedCompanionshp";
import MyBuddyRequest from "../Screens/MyBuddyRequest";

const Stack = createNativeStackNavigator();

const TravelBuddyNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Travel Buddy",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="BuddyScreen"
        component={TravelBuddy}
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

export default TravelBuddyNavigation;
