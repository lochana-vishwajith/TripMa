import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AttractionFinder from "../Screens/AttractionFinder";
import AttractionList from "../Screens/AttractionList";
import AttractionDetails from "../Screens/AttractionDetails";
import AttracttionMap from "../Screens/AttractionMap";
import AttractionPreferences from "../Screens/AttractionPreferences";
import AttractionFutureCrowd from "../Screens/AttractionFutureCrowd";

const Stack = createNativeStackNavigator();

const AttractionFinderNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Journey Planner",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="Journey Planner"
        component={AttractionFinder}
        initialParams={{ icon: "location" }}
      />
      <Stack.Screen
        options={{
          title: "Attraction List",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="AttractionList"
        component={AttractionList}
        initialParams={{ icon: "location" }}
      />
      <Stack.Screen
        options={{
          title: "Attraction Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="AttractionDetails"
        component={AttractionDetails}
        initialParams={{ loc:'' }}
      />
      <Stack.Screen
        options={{
          title: "Attraction Map",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="AttractionMap"
        component={AttracttionMap}
        initialParams={{ icon: "location" }}
      />
      <Stack.Screen
        options={{
          title: "Attraction Preference",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="AttractionPreferences"
        component={AttractionPreferences}
        initialParams={{ icon: "location" }}
      />
      <Stack.Screen
        options={{
          title: "Future Crowd Predection",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="futureCrowd"
        component={AttractionFutureCrowd}
        initialParams={{ icon: "location" }}
      />
    </Stack.Navigator>
  );
};

export default AttractionFinderNavigation;
