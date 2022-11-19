import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default function StartupScreen() {
  return (
    <LinearGradient
      colors={["#FFAF7B", "#D76D77", "#3A1C71"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/logo/logo.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.motto}>Secure Mobile Travel Application</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
  },
  motto: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  imageContainer: {
    width: width - 50,
    height: height / 3,
    justifyContent: "center",
  },
  logo: {
    height: "90%",
    width: "90%",
  },
});
