import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";

import RealtimeCrowdUpdate from "../Components/RealtimeCrowdUpdate";
import { getAttractionList, getGoogleAttractionList } from "../Api/AttractionFinderAPIs";
import { hideLiveUpdateModal, showLiveUpdateModal,SetAttractionPreferences, GetLiveLocation } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GOOGLE_API_KEY } from "../Config/environments";
import AppLoader from "../Components/AppLoader";


const { height, width } = Dimensions.get("window");

const DATA = [
  {
    location_id: "9740782",
    name: "OSMO Fitness",
    latitude: "6.885833",
    longitude: "79.92571",
    description:
      "Want to look good, feel great and be healthy? Welcome to OSMO Fitness, the most exclusive, and state-of-the-art Wellness Studio and Gymnasium in Sri Lanka! OSMO Fitness is an international standard fitness centre featuring some of the world's best Technogym equipment and a wide range of facilities including a sauna and steam room, facilities for sports such as Badminton, Table Tennis, Squash and",
    rating: "3.5",
    num_reviews: "6",
    photo: {
      images: {
        small: {
          url: "https://media-cdn.tripadvisor.com/media/photo-l/0d/11/50/8d/osmo-fitness.jpg",
          width: "150",
          height: "150",
        },
        original: {
          url: "https://media-cdn.tripadvisor.com/media/photo-o/0d/11/50/8d/osmo-fitness.jpg",
          width: "1536",
          height: "2048",
        },
      },
    },
  },
  {
    location_id: "23751699",
    name: "Hexa",
    latitude: "6.882526",
    longitude: "79.89665",
    description:
      "“HEXA Adventure In The City” for Extreme Sports Lovers Of All Ages, In the Heart Of The Capital City Kotte, adjoining The picturistic Urban Wetland Park",
    rating: "0",
    num_reviews: "0",
    photo: {
      images: {
        small: {
          url: "https://media-cdn.tripadvisor.com/media/photo-l/21/8a/58/54/hexa-adventure-in-the.jpg",
          width: "150",
          height: "150",
        },
        original: {
          url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/8a/58/54/hexa-adventure-in-the.jpg",
          width: "1280",
          height: "1280",
        },
      },
    },
  },
  {
    location_id: "12622559",
    name: "Beddegana Wetland Park",
    latitude: "6.874848",
    longitude: "79.90047",
    description:
      "A place to go to get away from your busy life. Find Zen Island offering a range of relaxing spa treatments, Manicures & Pedicures.",
    rating: "4.5",
    num_reviews: "29",
    photo: {
      images: {
        small: {
          url: "https://media-cdn.tripadvisor.com/media/photo-l/0f/f6/c1/0e/zen-island.jpg",
          width: "150",
          height: "150",
        },
        original: {
          url: "https://media-cdn.tripadvisor.com/media/photo-o/0f/f6/c1/0e/zen-island.jpg",
          width: "1920",
          height: "1440",
        },
      },
    },
  },
];
let locations = [];

const CardComponent = ({
  name,
  photo,
  navigation,
  place_id,
  coordinate,
  description,
  rating,
  data
}) => {
  const [isChecked, setChecked] = useState(false);
  // const [locations, setLocations] = useState([]);
// console.log("PHOTO: ",photo);
  return (
    <TouchableOpacity>
      <Pressable
        onPress={() =>
          navigation.navigate("AttractionDetails", { data: data })
        }
      >
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: photo
                  ?(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${GOOGLE_API_KEY}`)
                  : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
              }}
              style={styles.cardImage}
            />
          </View>

          <Text style={styles.cardTitle}>{name}</Text>
          <View style={styles.checkbox}>
            <Rating
              style={styles.rating}
              type="custom"
              ratingCount={5}
              imageSize={20}
              ratingBackgroundColor="#D8D6D6"
              tintColor="#F3F3F3"
              startingValue={rating ? rating : 0}
              readonly={true}
            />
            <Checkbox
              style={styles.checkboxInside}
              value={isChecked}
              onValueChange={(e) => {
                <>
                  {isChecked == false ? setChecked(true) : setChecked(false)}
                </>;
                if (!isChecked) {
                  // locations.push(JSON.parse(JSON.stringify(coordinate)));
                  const dataObj ={
                    coords:data["geometry"]["location"],
                    name: name
                  }
                  // locations.push(data["geometry"]["location"]);
                  locations.push(dataObj);
                  console.log("Locations rr", locations);
                } else if (isChecked) {
                  if (locations) {
                    locations.forEach((element) => {
                      if (
                        // element.lat === data["geometry"]["location"]["lat"] &&
                        // element.lng === data["geometry"]["location"]["lng"]
                        element.coords.lat === data["geometry"]["location"]["lat"] &&
                        element.coords.lng === data["geometry"]["location"]["lng"]
                      ) {
                        locations.splice(locations.indexOf(element), 1);
                      } else {
                        console.log("cannot find element");
                      }
                    });
                    console.log("Locations uu", locations);
                  }
                }
              }}
            />
          </View>
          {/* <Rating
            style={styles.rating}
            type="custom"
            ratingCount={5}
            imageSize={20}
            ratingBackgroundColor="#D8D6D6"
            tintColor="#F3F3F3"
            startingValue={rating}
          /> */}
          <View style={styles.section}>
            <View style={styles.cardMoreDetails}>
              {description ? (
                <Text>
                  {description.length > 108
                    ? `${description.substr(0, 108)}...`
                    : description}
                </Text>
              ) : (
                <Text>Description not available...</Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

const AttractionList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {lat} = route.params;
  const { cordinates } = route.params;
  // console.log("List Coordinates: ", cordinates);
  const [isModalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const bounds = {
    northEast: {
      latitude: 6.904389709930062,
      longitude: 79.91931438446045,
    },
    southWest: {
      latitude: 6.890092813560047,
      longitude: 79.89860873669386,
    },
  };
  useEffect(async() => {
    setIsLoading(true);
    console.log("Passed location1",cordinates)
      // getAttractionList(cordinates).then((res) => {
      //   console.log("Fetched Places: ", res);
      //   setPlaces(res?.filter((place) => place.name && place.num_reviews > 0));
      // });
      const palces =  await getGoogleAttractionList(cordinates);
      // console.log("Google fetch places: ",palces);
      setPlaces(palces);
      setIsLoading(false);
  }, []);
  const renderItem = ({ item }) => (
    <CardComponent
      name={item.name}
      photo={
        item.photos
          // ? item.photo.images.original.url
          // ? item.photos[0].html_attributions[0]
          ? item["photos"][0]["photo_reference"]
          : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
      }
      // location_id={item.location_id}
      location_id={item.place_id}
      rating={item.rating}
      description={item.vicinity}
      navigation={navigation}
      // coordinate={[{ latitude: item.latitude, longitude: item.longitude }]}
      coordinate={[{ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng }]}
      data={item}
    />
  );
  return (
    <View style={styles.container}>
      <RealtimeCrowdUpdate title="Hello" isVisible={isModalVisible} />
      <View>
        <TouchableOpacity>
          <Pressable
            onPress={() => {
              // setModalVisible(true);
              dispatch(showLiveUpdateModal(true));
              console.log("Test Button");
              setTimeout(() => {
                setModalVisible(false);
              dispatch(hideLiveUpdateModal(false));
              }, 60000);
            }}
          >
            <Text>Test Popup</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
      <View style={styles.findBtnContainer}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FBD786", "#f7797d"]}
            style={styles.buttonGredient}
          >
            <Pressable
              onPress={() => {
                // console.log("final Location:", locations);
                navigation.navigate("AttractionMap", { locations: locations })
              }}
              style={styles.findBtn}
            >
              <Text style={styles.findBtnText}>Start Trip</Text>
            </Pressable>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        data={places}
        renderItem={renderItem}
        // keyExtractor={(item) => item.location_id}
        keyExtractor={(item) => item.place_id}
        style={styles.listView}
      />
      {isLoading ? <AppLoader /> : null}
    </View>
  );
};

export default AttractionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    // paddingTop: height / 30,
  },
  cardContent: {
    width: width / 1.1,
    height: height / 4,
    marginTop: height / 45,
    borderRadius: 10,
    borderColor: "#f7797d",
    borderWidth: 0.5,
  },
  cardImage: {
    height: height / 8,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    resizeMode: "cover",
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: width / 55,
    // marginTop: height / 150,
  },
  rating: {
    // alignItems: "flex-start",
    // marginLeft: width / 70,
    // marginTop: height / 100,
    marginRight: width / 3,
  },
  cardMoreDetails: {
    alignItems: "flex-start",
    marginLeft: width / 50,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginLeft: width / 65,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listView: {
    marginBottom: height / 8,
  },
  findBtn: {
    alignItems: "center",
    height: height / 25,
    justifyContent: "center",
    borderRadius: 10,
  },
  findBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonGredient: {
    borderRadius: 10,
    width: width / 6,
  },
  findBtnContainer: {
    alignItems: "flex-end",
    paddingTop: height / 70,
    marginBottom: height / 70,
  },
  checkboxInside: {
    // marginTop: height / 100,
    marginRight: 5,
  },
});
