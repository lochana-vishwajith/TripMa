import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AttractionFinder from "../Screens/AttractionFinder";
import SafeRouteFinder from "../Screens/SafeRouteFinder";
import TabBar from "./TabBar";
import HomeNavigation from "./HomeNavigation";
import TravelBuddyNavigation from "./TravelBuddyNavigation";
import MoreOptinsNavigation from "./MoreOptinsNavigation";
import AttractionFinderNavigation from "./AttractionFinderNavigation";
import SafeRouteNavigation from "./SafeRouteNavigation";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeNavigation}
        initialParams={{ icon: "home" }}
      />
      <Tab.Screen
        options={{
          // title: "TripMa",
          // headerTintColor: "white",
          // headerStyle: { backgroundColor: "#f7797d" },
          headerShown: false,
        }}
        name="Attraction"
        component={AttractionFinderNavigation}
        initialParams={{ icon: "location" }}
      />
      <Tab.Screen
        options={{
          // title: "TripMa",
          // headerTintColor: "white",
          // headerStyle: { backgroundColor: "#f7797d" },
          headerShown: false,
        }}
        name="Safety"
        component={SafeRouteNavigation}
        initialParams={{ icon: "milestone" }}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Buddy"
        component={TravelBuddyNavigation}
        initialParams={{ icon: "heart" }}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="More"
        component={MoreOptinsNavigation}
        initialParams={{ icon: "three-bars" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
