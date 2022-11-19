import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ShowLocationPoint = ({ route }) => {
  const obj = route.params.objects;
  return (
    <View>
      <Text>ShowLocationPoint</Text>
    </View>
  );
};


/**  useEffect(() => {
    let obj = {
      origin: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };
    axios
      .post(
        `http://travel-buddy-research.herokuapp.com/liveIssue/nearbyissues`,
        obj
      )
      .then((res) => {
        console.log(res.data.length);
        setnearbyissueslist(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);
 */

export default ShowLocationPoint;

const styles = StyleSheet.create({});
