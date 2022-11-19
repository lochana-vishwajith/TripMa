import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import SafeRouteScreen from "../Screens/SafeRouteFinder";
import ShowSafetySuggessions from "../Screens/ShowSafetySuggessions";
import SafetyPreferences from "../Screens/SafetyPreferences";
import LiveIssueReporter from "../Screens/LiveIssueReporter";
import SearchPlaceSafety from "../Screens/SearchPlaceSafety";
import PlaceSafetyIndex from "../Screens/PlaceSafetyIndex";
import NearByIssueList from "../Screens/NearByIssueList";
import NearbyIssueDetails from "../Screens/NearByIssueDetails";
import SafetySuggestionDetails from "../Screens/SafetySuggestionDetails";
import NearByIssueWithMap from "../Screens/NearByIssueWithMap";
import IssueDetailExpand from "../Screens/IssueDetailExpand";
const Stack = createNativeStackNavigator();

export default function SafeRouteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Search Places For Safety Index",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="SearchPlaceSafety"
        component={SearchPlaceSafety}
      />
      <Stack.Screen
        options={{
          title: "Safety-Assistance",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="SafeRouteScreen"
        component={SafeRouteScreen}
      />
      <Stack.Screen
        options={{
          title: "Safety-Preference",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="SafetyPreferences"
        component={SafetyPreferences}
      />
      <Stack.Screen
        options={{
          title: "Report Live Issues",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="LiveIssueReporter"
        component={LiveIssueReporter}
      />
      <Stack.Screen
        options={{
          title: "Place Safety Index",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="PlaceSafetyIndex"
        initialParams={{ data: {} }}
        component={PlaceSafetyIndex}
      />
      <Stack.Screen
        options={{
          title: "Nearby Issues List",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="NearByIssueList"
        initialParams={{ data: {} }}
        component={NearByIssueList}
      />

      <Stack.Screen
        options={{
          title: "Add Your Issues",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="LiveissueDetails"
        initialParams={{ data: {} }}
        component={NearbyIssueDetails}
      />
      <Stack.Screen
        options={{
          title: "Live Suggestions",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="Livesuggestions"
        initialParams={{ data: {} }}
        component={ShowSafetySuggessions}
      />

      <Stack.Screen
        options={{
          title: "Suggestions Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="showsuggestionDetails"
        initialParams={{ data: {} }}
        component={SafetySuggestionDetails}
      />

      <Stack.Screen
        options={{
          title: "Issue Summary",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="nearbyIssueMap"
        initialParams={{ data: {} }}
        component={NearByIssueWithMap}
      />

      <Stack.Screen
        options={{
          title: "Issue Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        name="NearbyIssueDetail"
        initialParams={{ data: {} }}
        component={IssueDetailExpand}
      />
    </Stack.Navigator>
  );
}
