import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

const Tab = ({ color, tab, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Octicons name={icon} size={20} color={color} />
      <Text style={{ color, fontSize: 10 }}>{tab.name}</Text>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
