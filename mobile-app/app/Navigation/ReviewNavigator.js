import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();
import AddReviews from "../Screens/AddReview";
import MyReviews from "../Screens/MyReviews";
import ViewMyReview from "../Screens/ViewMyReview";
import Reviews from "../Screens/Reviews";

const ReviewNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="reviews"
        options={{
          headerShown: true,
          title: "Reviews",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        component={Reviews}
      />
      <Stack.Screen
        name="add_review"
        options={{
          headerShown: true,
          title: "Add Reviews",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        component={AddReviews}
      />
      <Stack.Screen
        name="my_review"
        options={{
          headerShown: true,
          title: "My Reviews",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        component={MyReviews}
      />
      <Stack.Screen
        name="view_my_review"
        options={{
          headerShown: true,
          title: "My Review",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#f7797d" },
        }}
        component={ViewMyReview}
      />
    </Stack.Navigator>
  );
};

export default ReviewNavigator;
