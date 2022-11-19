import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import NearByIssueWithMap from "../Screens/NearByIssueWithMap";

const Stack = createNativeStackNavigator();

export default function NearByIssueWithMapNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "TripMa-Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="NearByIssueWithMap"
        component={NearByIssueWithMap}
      />
    </Stack.Navigator>
  );
}
