import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { LogoutUser } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: 1,
    title: "Profile",
    name: "person",
    component: "UserProfile",
  },
  {
    id: 2,
    title: "Reviews",
    name: "comment",
    component: "Reviews",
  },
  {
    id: 3,
    title: "Companionship",
    name: "person",
    component: "currentCompanionship",
  },
  {
    id: 4,
    title: "preference Profile",
    name: "checklist",
    component: "PreferenceNavigation",
  },
  {
    id: 5,
    title: "My Buddy Requests",
    name: "search",
    component: "MyBuddyRequestNavigation",
  },
];

const CardComponent = ({ title, name, navigation, component, key }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(component)} key={key}>
      <View style={styles.cardContent}>
        <Octicons
          name={name}
          size={30}
          style={styles.optionIcon}
          color="#f7797d"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.optinTxt}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MoreOptions = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.AuthReducer.userDetails._id);

  console.log("user id : ", userId);
  const renderItem = ({ item }) => (
    <CardComponent
      title={item.title}
      name={item.name}
      component={item.component}
      navigation={navigation}
      key={item.id}
    />
  );

  const LogoutUserSystem = async (id) => {
    await axios
      .put(`https://travel-buddy-research.herokuapp.com/user/logOutUser/${id}`)
      .then(async (result) => {
        console.log("result login : ", result.data);
        if (result) {
          await AsyncStorage.clear();
          dispatch(LogoutUser());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => LogoutUserSystem(userId)}>
        <View style={styles.cardContent}>
          <Octicons
            name="sign-out"
            size={30}
            style={styles.optionIcon}
            color="#f7797d"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.optinTxt}>Log-Out</Text>
          </View>
        </View>
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  cardContent: {
    width: "100%",
    marginTop: height / 45,
    borderRadius: 9,
    borderColor: "#f7797d",
    borderWidth: 0.4,
    flexDirection: "row",
  },
  optionIcon: {
    paddingLeft: width / 30,
    paddingVertical: height / 40,
    paddingRight: width / 16,
  },
  optinTxt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingLeft: "8%",
  },
  titleContainer: {
    justifyContent: "center",
    borderLeftWidth: 0.4,
    borderLeftColor: "#f7797d",
  },
});
