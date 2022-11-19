import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import ViewDetails from "../Screens/ViewDetails";

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "TripMa-Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: "TripMa",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        initialParams={{ id: "" }}
        name="ViewDetails"
        component={ViewDetails}
      />
    </Stack.Navigator>
  );
}
