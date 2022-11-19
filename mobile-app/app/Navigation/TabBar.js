import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Tab from "./Tab";

const { width, height } = Dimensions.get("window");
const TabBar = ({ state, navigation }) => {
  const { routes } = state;
  const [selected, setSelected] = useState("Home");
  const renderColor = (currentTab) =>
    currentTab === selected ? "#f7797d" : "black";
  const handlePress = (active, index) => {
    if (state.index !== index) {
      setSelected(active);
      navigation.navigate(active);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    width,
    height: height / 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 100,
    width: width - 20,
    borderWidth: 0.4,
    borderColor: "#f7797d",
    elevation: 10,
  },
});
