const openStatus = (data) => {
  return new Promise(async (resovle, reject) => {
    console.log("Invoking open status model");
    try {
      let open = 0;
      let close = 0;
      let dontknow = 0;
      const totalData = data.length;
      let statusAnalysis;
      let statusScore = 0;

      for (let index = 0; index < data.length; index++) {
        // console.log("Crowd on Score: ", data[index].openStatus);
        if (data[index].openStatus == 0) {
          close = close + 1;
        } else if (data[index].openStatus == 1) {
          open = open + 1;
        } else if (data[index].openStatus == 2) {
          dontknow = dontknow + 1;
        }
      }

      if (open / totalData > 0.5) {
        statusAnalysis = "open";
        statusScore = 1;
      } else if (close / totalData > 0.5) {
        statusAnalysis = "close";
        statusScore = 0;
      } else if (dontknow / totalData > 0.5) {
        statusAnalysis = "dontKnow";
        statusScore = 0.5;
      } else {
        statusAnalysis = "unpredectable";
        statusScore = 0.2;
      }

      const statusPrediction = {
        statusAnalysis: statusAnalysis,
        statusScore: statusScore,
      };
      // console.log("Open Status :", statusPrediction);
      resovle(statusPrediction);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

const visitNow = (data) => {
  return new Promise(async (resovle, reject) => {
    console.log("Invoking visit status model");
    try {
      let yes = 0;
      let no = 0;
      const totalData = data.length;
      let vistAnalysis;

      for (let index = 0; index < data.length; index++) {
        console.log("visits now: ", data[index].visit);
        if (data[index].visit == 0) {
          no = no + 1;
        } else if (data[index].visit == 1) {
          yes = yes + 1;
        }
      }

      if (yes / totalData > 0.5) {
        vistAnalysis = 1;
      } else if (no / totalData > 0.5) {
        vistAnalysis = 0.2;
      } else {
        vistAnalysis = 0.5;
      }

      const visitPrediction = {
        vistAnalysis: vistAnalysis,
        yes:yes,
        no:no,
      };

      // console.log("Visit Status :", visitPrediction);
      resovle(visitPrediction);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

module.exports = { openStatus, visitNow };
