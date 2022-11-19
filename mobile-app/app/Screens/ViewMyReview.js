import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";

const { height, width } = Dimensions.get("window");
const ViewMyReview = () => {
  return (
    <View style={styles.container}>
      <Card>
        <CardImage
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbefelFQwu2_ZARCvdWHWPTlyqNz7w85__JA&usqp=CAU",
          }}
        />

        <CardTitle subtitle="" />
        <CardContent text="Feedback" />
        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={() => {
              console.log("Delete review");
            }}
            title="Delete"
            color="#f7797d"
          />
        </CardAction>
      </Card>
    </View>
  );
};

export default ViewMyReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
});
