import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import NearByIssueDetails from "../Screens/NearByIssueDetails";

const Stack = createNativeStackNavigator();

export default function NearByIssueDetailsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "TripMa-Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="NearByIssueDetails"
        component={NearByIssueDetails}
      />
    </Stack.Navigator>
  );
}
