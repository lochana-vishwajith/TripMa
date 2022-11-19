import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { moment } from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import AppLoader from "../Components/AppLoader";

const { height, width } = Dimensions.get("window");
export default function AttractionFutureCrowd({ navigation, route }) {
  const { loc } = route.params;

  const [crowdScore_12_2, setCrowdScore_12_2] = useState(0);
  const [crowdScore_2_4, setCrowdScore_2_4] = useState(0);
  const [crowdScore_4_6, setCrowdScore_4_6] = useState(0);
  const [crowdScore_6_8, setCrowdScore_6_8] = useState(0);
  const [crowdScore_8_10, setCrowdScore_8_10] = useState(0);
  const [crowdScore_10_12, setCrowdScore_10_12] = useState(0);
  const [crowdScore_12_14, setCrowdScore_12_14] = useState(0);
  const [crowdScore_14_16, setCrowdScore_14_16] = useState(0);
  const [crowdScore_16_18, setCrowdScore_16_18] = useState(0);
  const [crowdScore_18_20, setCrowdScore_18_20] = useState(0);
  const [crowdScore_20_22, setCrowdScore_20_22] = useState(0);
  const [crowdScore_22_24, setCrowdScore_22_24] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://travel-buddy-research.herokuapp.com/liveCrowd/${loc.geometry.location.lat}/${loc.geometry.location.lng}`
      )
      .then((result) => {
        console.log("front:", result.data);
        setCrowdScore_12_2(result.data.crowdAnalysis_12_2);
        setCrowdScore_2_4(result.data.crowdAnalysis_2_4);
        setCrowdScore_4_6(result.data.crowdAnalysis_4_6);
        setCrowdScore_6_8(result.data.crowdAnalysis_6_8);
        setCrowdScore_8_10(result.data.crowdAnalysis_8_10);
        setCrowdScore_10_12(result.data.crowdAnalysis_10_12);
        setCrowdScore_12_14(result.data.crowdAnalysis_12_14);
        setCrowdScore_14_16(result.data.crowdAnalysis_14_16);
        setCrowdScore_16_18(result.data.crowdAnalysis_16_18);
        setCrowdScore_18_20(result.data.crowdAnalysis_18_20);
        setCrowdScore_20_22(result.data.crowdAnalysis_20_22);
        setCrowdScore_22_24(result.data.crowdAnalysis_22_24);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    labels: [
      "12-2 AM",
      "2-4 AM",
      "4-6 AM",
      "6-8 AM",
      "8-10 AM",
      "10-12 AM",
      "12-2 PM",
      "2-4 PM",
      "4-6 PM",
      "6-8 PM",
      "8-10 PM",
      "10-12 PM",
    ],
    datasets: [
      {
        data: [
          crowdScore_12_2,
          crowdScore_2_4,
          crowdScore_4_6,
          crowdScore_6_8,
          crowdScore_8_10,
          crowdScore_10_12,
          crowdScore_12_14,
          crowdScore_14_16,
          crowdScore_16_18,
          crowdScore_18_20,
          crowdScore_20_22,
          crowdScore_22_24,
        ],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#ef8383",
    backgroundGradientFromOpacity: 8,
    backgroundGradientTo: "#ef8383",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 5) => `rgba(50, 30, 30, ${opacity})`,
    strokeWidth: 8, // optional, default 3
    barPercentage: 0.3,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nameText}>Today Crowd Prediction of {loc.name}</Text>
      </View>
      <BarChart
        // style={graphStyle}
        data={data}
        width={width}
        height={height / 1.4}
        yAxisLabel="S"
        chartConfig={chartConfig}
        verticalLabelRotation={90}
        withHorizontalLabels={false}
        yAxisSuffix="j"
        // yLabelsOffset={}
      />
      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: height / 25,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  nameText:{
    fontSize:20
  }
});
