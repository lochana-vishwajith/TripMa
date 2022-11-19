import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import PlaceSafetyIndex from "../Screens/PlaceSafetyIndex";

const Stack = createNativeStackNavigator();

export default function PlaceSafetyIndexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "TripMa-Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="PlaceSafetyIndex"
        component={PlaceSafetyIndex}
      />
    </Stack.Navigator>
  );
}
