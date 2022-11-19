import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../firebase";
import AppLoader from "../Components/AppLoader";
import axios from "axios";

const { height, width } = Dimensions.get("window");
const StatusBarHeight = Constants.statusBarHeight;

const AddProfilePic = ({ navigation, route }) => {
  const userDetails = useSelector((state) => state.AuthReducer.registerDetails);
  const [isUserRegistrationLoading, setRegistrationLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }

  const registerUser = async () => {
    console.log("registerd");
    if (userDetails && downloadURL !== null) {
      setRegistrationLoading(true);

      userDetails["image"] = downloadURL;
      console.log("userDetails", userDetails);

      await axios
        .post("https://travel-buddy-research.herokuapp.com/user", userDetails)
        .then((result) => {
          console.log("result ", result);
          setRegistrationLoading(false);

          navigation.navigate("login");
        })
        .catch((err) => {
          console.log("error ", err);
          setRegistrationLoading(false);
        });
    }
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadToFirebase = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toString());
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log("error - ", error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download url - ", url);
          setDownloadURL(url);
          setImageUploaded(true);
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.uploadPicContainer}>
        <Text style={styles.uploadPicTxt}>Upload a photo</Text>
        <TouchableOpacity style={styles.imagePicker}>
          <Avatar.Image
            size={190}
            source={
              image === null
                ? require("../assets/kindpng_785975.png")
                : { uri: image }
            }
          />
        </TouchableOpacity>
        <Text>Upload a picture of you to help others</Text>
        <Text> to identify easily.</Text>
        {image === null ? (
          <TouchableOpacity onPress={uploadImage}>
            <Text style={styles.uploadTxt}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={uploadToFirebase} disabled={imageUploaded}>
            {imageUploaded ? (
              <Text style={styles.uploadTxt}>Saved</Text>
            ) : (
              <Text style={styles.uploadTxt}>Save</Text>
            )}
          </TouchableOpacity>
        )}
        {uploading ? <ActivityIndicator size="large" color="#f7797d" /> : null}
      </View>
      <TouchableOpacity onPress={registerUser}>
        <Text style={styles.finishTxt}>Finish</Text>
      </TouchableOpacity>
      {isUserRegistrationLoading ? <AppLoader /> : null}
    </SafeAreaView>
  );
};

export default AddProfilePic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 17,
    paddingTop: StatusBarHeight + 5,
    paddingBottom: height / 13,
  },
  uploadPicContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadPicTxt: {
    fontSize: 30,
    paddingVertical: height / 35,
    paddingHorizontal: width / 10,
    fontWeight: "bold",
    color: "#f7797d",
  },
  finishTxt: {
    fontSize: 20,
    textAlign: "right",
    color: "#f7797d",
  },
  imagePicker: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "3%",
  },
  uploadTxt: {
    marginVertical: "15%",
    padding: "5%",
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#f7797d",
    color: "#f7797d",
  },
});
