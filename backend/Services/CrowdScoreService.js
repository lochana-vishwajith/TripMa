const crowdScore = (data) => {
  return new Promise(async (resovle, reject) => {
    console.log("Invoking crowd score model");
    try {
      let lowCrowd = 0;
      let averageCrowd = 0;
      let highCrowd = 0;
      const totalCrowd = data.length;
      let crowdAnalysis;
      let crowdScore = 0;

      for (let index = 0; index < data.length; index++) {
        // console.log("Crowd on Score: ", data[index].crowd);
        if (data[index].crowd == 0) {
          lowCrowd = lowCrowd + 1;
        } else if (data[index].crowd == 5) {
          averageCrowd = averageCrowd + 1;
        } else if (data[index].crowd == 10) {
          highCrowd = highCrowd + 1;
        }
      }

      if (lowCrowd / totalCrowd == 1 || lowCrowd / totalCrowd > 0.5) {
        crowdAnalysis = "low";
        crowdScore = 0.7;
      } else if (
        averageCrowd / totalCrowd == 1 ||
        averageCrowd / totalCrowd > 0.5
      ) {
        crowdAnalysis = "avg";
        crowdScore = 0.2;
      } else if (highCrowd / totalCrowd == 1 || highCrowd / totalCrowd > 0.5) {
        crowdAnalysis = "high";
        crowdScore = 0.1;
      } else {
        crowdAnalysis = "unpredectable";
        crowdScore = 0;
      }

      const crowdPrediction = {
        totalCrowd,
        lowCrowd,
        averageCrowd,
        highCrowd,
        crowdAnalysis,
        crowdScore,
      };
      // console.log("Crowd Analysis :", crowdPrediction);
      resovle(crowdPrediction);
    } catch (error) {
      console.log(
        "Failed to add scores based on the crowd:" + JSON.stringify(error)
      );
      reject();
    }
  });
};

module.exports = { crowdScore };
