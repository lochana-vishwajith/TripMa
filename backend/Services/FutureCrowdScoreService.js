const moment = require("moment");

const futurecrowdScore = (data) => {
  return new Promise(async (resovle, reject) => {
    console.log("Invoking future crowd score model");
    try {
      let allTimeSets = [];
      let fourToSixA = [];
      let sixToEightA = [];
      let eightToTenA = [];
      let tenToTwelveA = [];
      let twelveToTwoP = [];
      let twoToFourP = [];
      let fourToSixP = [];
      let sixToEightP = [];
      let eightToTenP = [];
      let tenToTwelveP = [];
      let twelveToTwoA = [];
      let twoToFourA = [];

      let lowCrowd_12_2 = 0;
      let averageCrowd_12_2 = 0;
      let highCrowd_12_2 = 0;
      const totalCrowd_12_2 = twelveToTwoA.length;
      let crowdAnalysis_12_2;
      let crowdScore_12_2 = 0;

      let lowCrowd_2_4 = 0;
      let averageCrowd_2_4 = 0;
      let highCrowd_2_4 = 0;
      const totalCrowd_2_4 = twoToFourA.length;
      let crowdAnalysis_2_4;
      let crowdScore_2_4 = 0;

      let lowCrowd_4_6 = 0;
      let averageCrowd_4_6 = 0;
      let highCrowd_4_6 = 0;
      const totalCrowd_4_6 = fourToSixA.length;
      let crowdAnalysis_4_6;
      let crowdScore_4_6 = 0;

      let lowCrowd_6_8 = 0;
      let averageCrowd_6_8 = 0;
      let highCrowd_6_8 = 0;
      const totalCrowd_6_8 = sixToEightA.length;
      let crowdAnalysis_6_8;
      let crowdScore_6_8 = 0;

      let lowCrowd_8_10 = 0;
      let averageCrowd_8_10 = 0;
      let highCrowd_8_10 = 0;
      const totalCrowd_8_10 = eightToTenA.length;
      let crowdAnalysis_8_10;
      let crowdScore_8_10 = 0;

      let lowCrowd_10_12 = 0;
      let averageCrowd_10_12 = 0;
      let highCrowd_10_12 = 0;
      const totalCrowd_10_12 = tenToTwelveA.length;
      let crowdAnalysis_10_12;
      let crowdScore_10_12 = 0;

      let lowCrowd_12_14 = 0;
      let averageCrowd_12_14 = 0;
      let highCrowd_12_14 = 0;
      const totalCrowd_12_14 = twelveToTwoP.length;
      let crowdAnalysis_12_14;
      let crowdScore_12_14 = 0;

      let lowCrowd_14_16 = 0;
      let averageCrowd_14_16 = 0;
      let highCrowd_14_16 = 0;
      const totalCrowd_14_16 = twoToFourP.length;
      let crowdAnalysis_14_16;
      let crowdScore_14_16 = 0;

      let lowCrowd_16_18 = 0;
      let averageCrowd_16_18 = 0;
      let highCrowd_16_18 = 0;
      const totalCrowd_16_18 = fourToSixP.length;
      let crowdAnalysis_16_18;
      let crowdScore_16_18 = 0;

      let lowCrowd_18_20 = 0;
      let averageCrowd_18_20 = 0;
      let highCrowd_18_20 = 0;
      const totalCrowd_18_20 = sixToEightP.length;
      let crowdAnalysis_18_20;
      let crowdScore_18_20 = 0;

      let lowCrowd_20_22 = 0;
      let averageCrowd_20_22 = 0;
      let highCrowd_20_22 = 0;
      const totalCrowd_20_22 = eightToTenP.length;
      let crowdAnalysis_20_22;
      let crowdScore_20_22 = 0;

      let lowCrowd_22_24 = 0;
      let averageCrowd_22_24 = 0;
      let highCrowd_22_24 = 0;
      const totalCrowd_22_24 = tenToTwelveP.length;
      let crowdAnalysis_22_24;
      let crowdScore_22_24 = 0;

      data.forEach((element) => {
        let date = moment(element.date).utc().toArray();
        // console.log("Date from moment", date);
        // console.log("Date Original", element.date);
        if (00 <= date[3] && date[4] >= 00 && 2 > date[3] && date[4] <= 59) {
          twelveToTwoA.push(element);
        }
        if (2 <= date[3] && date[4] >= 00 && 4 > date[3] && date[4] <= 59) {
          twoToFourA.push(element);
        }
        if (4 <= date[3] && date[4] >= 00 && 6 > date[3] && date[4] <= 59) {
          fourToSixA.push(element);
        }
        if (6 <= date[3] && date[4] >= 00 && 8 > date[3] && date[4] <= 59) {
          sixToEightA.push(element);
        }
        if (8 <= date[3] && date[4] >= 00 && 10 > date[3] && date[4] <= 59) {
          eightToTenA.push(element);
        }
        if (10 <= date[3] && date[4] >= 00 && 12 > date[3] && date[4] <= 59) {
          tenToTwelveA.push(element);
        }
        if (12 <= date[3] && date[4] >= 00 && 14 > date[3] && date[4] <= 59) {
          twelveToTwoP.push(element);
        }
        if (14 <= date[3] && date[4] >= 00 && 16 > date[3] && date[4] <= 59) {
          twoToFourP.push(element);
        }
        if (16 <= date[3] && date[4] >= 00 && 18 > date[3] && date[4] <= 59) {
          fourToSixP.push(element);
        }
        if (18 <= date[3] && date[4] >= 00 && 20 > date[3] && date[4] <= 59) {
          sixToEightP.push(element);
        }
        if (20 <= date[3] && date[4] >= 00 && 22 > date[3] && date[4] <= 59) {
          eightToTenP.push(element);
        }
        if (22 <= date[3] && date[4] >= 00 && 24 > date[3] && date[4] <= 59) {
          tenToTwelveP.push(element);
        }
      });
      //   allTimeSets.push(twelveToTwoA);
      //   allTimeSets.push(twoToFourA);
      //   allTimeSets.push(fourToSixA);
      //   allTimeSets.push(sixToEightA);
      //   allTimeSets.push(eightToTenA);
      //   allTimeSets.push(tenToTwelveA);
      //   allTimeSets.push(twelveToTwoP);
      //   allTimeSets.push(twoToFourP);
      //   allTimeSets.push(fourToSixP);
      //   allTimeSets.push(sixToEightP);
      //   allTimeSets.push(eightToTenP);
      //   allTimeSets.push(tenToTwelveP);

      //   console.log("12AM-2AM", twelveToTwoA);
      //   console.log("2AM-4AM", twoToFourA);
      //   console.log("4AM-6AM", fourToSixA);
      //   console.log("6AM-8AM", sixToEightA);
      //   console.log("8AM-10AM", eightToTenA);
      //   console.log("10AM-12AM", tenToTwelveA);
      //   console.log("12PM-2PM", twelveToTwoP);
      //   console.log("2PM-4PM", twoToFourP);
      //   console.log("4PM-6PM", fourToSixP);
      //   console.log("6PM-8PM", sixToEightP);
      //   console.log("8PM-10PM", eightToTenP);
      //   console.log("10PM-12PM", tenToTwelveP);

      for (let index = 0; index < twelveToTwoA.length; index++) {
        // console.log("Crowd on Score: ", twelveToTwoA[index].crowd);
        if (twelveToTwoA[index].crowd == 0) {
          lowCrowd_12_2 = lowCrowd_12_2 + 1;
        } else if (twelveToTwoA[index].crowd == 5) {
          averageCrowd_12_2 = averageCrowd_12_2 + 1;
        } else if (twelveToTwoA[index].crowd == 10) {
          highCrowd_12_2 = highCrowd_12_2 + 1;
        }
      }

      for (let index = 0; index < twoToFourA.length; index++) {
        // console.log("Crowd on Score: ", twoToFourA[index].crowd);
        if (twoToFourA[index].crowd == 0) {
          lowCrowd_2_4 = lowCrowd_2_4 + 1;
        } else if (twoToFourA[index].crowd == 5) {
          averageCrowd_2_4 = averageCrowd_2_4 + 1;
        } else if (twoToFourA[index].crowd == 10) {
          highCrowd_2_4 = highCrowd_2_4 + 1;
        }
      }
      for (let index = 0; index < fourToSixA.length; index++) {
        // console.log("Crowd on Score: ", fourToSixA[index].crowd);
        if (fourToSixA[index].crowd == 0) {
          lowCrowd_4_6 = lowCrowd_4_6 + 1;
        } else if (fourToSixA[index].crowd == 5) {
          averageCrowd_4_6 = averageCrowd_4_6 + 1;
        } else if (fourToSixA[index].crowd == 10) {
          highCrowd_4_6 = highCrowd_4_6 + 1;
        }
      }
      for (let index = 0; index < sixToEightA.length; index++) {
        // console.log("Crowd on Score: ", sixToEightA[index].crowd);
        if (sixToEightA[index].crowd == 0) {
          lowCrowd_6_8 = lowCrowd_6_8 + 1;
        } else if (sixToEightA[index].crowd == 5) {
          averageCrowd_6_8 = averageCrowd_6_8 + 1;
        } else if (sixToEightA[index].crowd == 10) {
          highCrowd_6_8 = highCrowd_6_8 + 1;
        }
      }
      for (let index = 0; index < eightToTenA.length; index++) {
        // console.log("Crowd on Score: ", eightToTenA[index].crowd);
        if (eightToTenA[index].crowd == 0) {
          lowCrowd_8_10 = lowCrowd_8_10 + 1;
        } else if (eightToTenA[index].crowd == 5) {
          averageCrowd_8_10 = averageCrowd_8_10 + 1;
        } else if (eightToTenA[index].crowd == 10) {
          highCrowd_8_10 = highCrowd_8_10 + 1;
        }
      }
      for (let index = 0; index < tenToTwelveA.length; index++) {
        // console.log("Crowd on Score: ", tenToTwelveA[index].crowd);
        if (tenToTwelveA[index].crowd == 0) {
          lowCrowd_10_12 = lowCrowd_10_12 + 1;
        } else if (tenToTwelveA[index].crowd == 5) {
          averageCrowd_10_12 = averageCrowd_10_12 + 1;
        } else if (tenToTwelveA[index].crowd == 10) {
          highCrowd_10_12 = highCrowd_10_12 + 1;
        }
      }
      for (let index = 0; index < twelveToTwoP.length; index++) {
        // console.log("Crowd on Score: ", twelveToTwoP[index].crowd);
        if (twelveToTwoP[index].crowd == 0) {
          lowCrowd_12_14 = lowCrowd_12_14 + 1;
        } else if (twelveToTwoP[index].crowd == 5) {
          averageCrowd_12_14 = averageCrowd_12_14 + 1;
        } else if (twelveToTwoP[index].crowd == 10) {
          highCrowd_12_14 = highCrowd_12_14 + 1;
        }
      }
      for (let index = 0; index < twoToFourP.length; index++) {
        // console.log("Crowd on Score: ", twoToFourP[index].crowd);
        if (twoToFourP[index].crowd == 0) {
          lowCrowd_14_16 = lowCrowd_14_16 + 1;
        } else if (twoToFourP[index].crowd == 5) {
          averageCrowd_14_16 = averageCrowd_14_16 + 1;
        } else if (twoToFourP[index].crowd == 10) {
          highCrowd_14_16 = highCrowd_14_16 + 1;
        }
      }
      for (let index = 0; index < fourToSixP.length; index++) {
        // console.log("Crowd on Score: ", fourToSixP[index].crowd);
        if (fourToSixP[index].crowd == 0) {
          lowCrowd_16_18 = lowCrowd_16_18 + 1;
        } else if (fourToSixP[index].crowd == 5) {
          averageCrowd_16_18 = averageCrowd_16_18 + 1;
        } else if (fourToSixP[index].crowd == 10) {
          highCrowd_16_18 = highCrowd_16_18 + 1;
        }
      }
      for (let index = 0; index < sixToEightP.length; index++) {
        // console.log("Crowd on Score: ", sixToEightP[index].crowd);
        if (sixToEightP[index].crowd == 0) {
          lowCrowd_18_20 = lowCrowd_18_20 + 1;
        } else if (sixToEightP[index].crowd == 5) {
          averageCrowd_18_20 = averageCrowd_18_20 + 1;
        } else if (sixToEightP[index].crowd == 10) {
          highCrowd_18_20 = highCrowd_18_20 + 1;
        }
      }
      for (let index = 0; index < eightToTenP.length; index++) {
        // console.log("Crowd on Score: ", eightToTenP[index].crowd);
        if (eightToTenP[index].crowd == 0) {
          lowCrowd_20_22 = lowCrowd_20_22 + 1;
        } else if (eightToTenP[index].crowd == 5) {
          averageCrowd_20_22 = averageCrowd_20_22 + 1;
        } else if (eightToTenP[index].crowd == 10) {
          highCrowd_20_22 = highCrowd_20_22 + 1;
        }
      }
      for (let index = 0; index < tenToTwelveP.length; index++) {
        // console.log("Crowd on Score: ", tenToTwelveP[index].crowd);
        if (tenToTwelveP[index].crowd == 0) {
          lowCrowd_22_24 = lowCrowd_22_24 + 1;
        } else if (tenToTwelveP[index].crowd == 5) {
          averageCrowd_22_24 = averageCrowd_22_24 + 1;
        } else if (tenToTwelveP[index].crowd == 10) {
          highCrowd_22_24 = highCrowd_22_24 + 1;
        }
      }

      if (lowCrowd_12_2 / totalCrowd_12_2 > 0.5) {
        // crowdAnalysis_12_2 = "low";
        crowdAnalysis_12_2 = (lowCrowd_12_2 / twelveToTwoA.length)*30;
        crowdScore_12_2 = 0.7;
      } else if (averageCrowd_12_2 / totalCrowd_12_2 > 0.5) {
        // crowdAnalysis_12_2 = "avg";
        crowdAnalysis_12_2 = (averageCrowd_12_2 / twelveToTwoA.length)*60;
        crowdScore_12_2 = 0.2;
      } else if (highCrowd_12_2 / totalCrowd_12_2 > 0.5) {
        // crowdAnalysis_12_2 = "high";
        crowdAnalysis_12_2 = (highCrowd_12_2 /twelveToTwoA.length)*100;
        crowdScore_12_2 = 0.1;
      } else {
        // crowdAnalysis_12_2 = "unpredectable";
        crowdAnalysis_12_2 = 0;
        crowdScore_12_2 = 0;
      }

      if (lowCrowd_2_4 / totalCrowd_2_4 > 0.5) {
        // crowdAnalysis_2_4 = "low";
        crowdAnalysis_2_4 = (lowCrowd_2_4 / twoToFourA.length)*30;
        crowdScore_2_4 = 0.7;
      } else if (averageCrowd_2_4 / totalCrowd_2_4 > 0.5) {
        // crowdAnalysis_2_4 = "avg";
        crowdAnalysis_2_4 = (averageCrowd_2_4 / twoToFourA.length)*60;
        crowdScore_2_4 = 0.2;
      } else if (highCrowd_2_4 / totalCrowd_2_4 > 0.5) {
        // crowdAnalysis_2_4 = "high";
        crowdAnalysis_2_4 = (highCrowd_2_4 / twoToFourA.length)*100;
        crowdScore_2_4 = 0.1;
      } else {
        // crowdAnalysis_2_4 = "unpredectable";
        crowdAnalysis_2_4 = 0;
        crowdScore_2_4 = 0;
      }

      if (lowCrowd_4_6 / totalCrowd_4_6 > 0.5) {
        // crowdAnalysis_4_6 = "low";
        crowdAnalysis_4_6 = (lowCrowd_4_6 / fourToSixA.length)*30;
        crowdScore_4_6 = 0.7;
      } else if (averageCrowd_4_6 / totalCrowd_4_6 > 0.5) {
        // crowdAnalysis_4_6 = "avg";
        crowdAnalysis_4_6 = (averageCrowd_4_6 / fourToSixA.length)*60;
        crowdScore_4_6 = 0.2;
      } else if (highCrowd_4_6 / totalCrowd_4_6 > 0.5) {
        // crowdAnalysis_4_6 = "high";
        crowdAnalysis_4_6 = (highCrowd_4_6 / fourToSixA.length)*100;
        crowdScore_4_6 = 0.1;
      } else {
        // crowdAnalysis_4_6 = "unpredectable";
        crowdAnalysis_4_6 = 0;
        crowdScore_4_6 = 0;
      }

      if (lowCrowd_6_8 / totalCrowd_6_8 > 0.5) {
        // crowdAnalysis_6_8 = "low";
        crowdAnalysis_6_8 = (lowCrowd_6_8 / sixToEightA.length)*30;
        crowdScore_6_8 = 0.7;
      } else if (averageCrowd_6_8 / totalCrowd_6_8 > 0.5) {
        // crowdAnalysis_6_8 = "avg";
        crowdAnalysis_6_8 = (averageCrowd_6_8 / sixToEightA.length)*60;
        crowdScore_6_8 = 0.2;
      } else if (highCrowd_6_8 / totalCrowd_6_8 > 0.5) {
        // crowdAnalysis_6_8 = "high";
        crowdAnalysis_6_8 = (highCrowd_6_8 / sixToEightA.length)*100;
        crowdScore_6_8 = 0.1;
      } else {
        // crowdAnalysis_6_8 = "unpredectable";
        crowdAnalysis_6_8 = 0;
        crowdScore_6_8 = 0;
      }

      if (lowCrowd_8_10 / totalCrowd_8_10 > 0.5) {
        // crowdAnalysis_8_10 = "low";
        crowdAnalysis_8_10 = (lowCrowd_8_10 / eightToTenA.length)*30;
        crowdScore_8_10 = 0.7;
      } else if (averageCrowd_8_10 / totalCrowd_8_10 > 0.5) {
        // crowdAnalysis_8_10 = "avg";
        crowdAnalysis_8_10 = (averageCrowd_8_10 / eightToTenA.length)*60;
        crowdScore_8_10 = 0.2;
      } else if (highCrowd_8_10 / totalCrowd_8_10 > 0.5) {
        // crowdAnalysis_8_10 = "high";
        crowdAnalysis_8_10 = (highCrowd_8_10 / eightToTenA.length)*100;
        crowdScore_8_10 = 0.1;
      } else {
        // crowdAnalysis_8_10 = "unpredectable";
        crowdAnalysis_8_10 = 0;
        crowdScore_8_10 = 0;
      }

      if (lowCrowd_10_12 / totalCrowd_10_12 > 0.5) {
        // crowdAnalysis_10_12 = "low";
        crowdAnalysis_10_12 = (lowCrowd_10_12 / tenToTwelveA.length)*30;
        crowdScore_10_12 = 0.7;
      } else if (averageCrowd_10_12 / totalCrowd_10_12 > 0.5) {
        // crowdAnalysis_10_12 = "avg";
        crowdAnalysis_10_12 = (averageCrowd_10_12 / tenToTwelveA.length)*60;
        crowdScore_10_12 = 0.2;
      } else if (highCrowd_10_12 / totalCrowd_10_12 > 0.5) {
        // crowdAnalysis_10_12 = "high";
        crowdAnalysis_10_12 = (highCrowd_10_12 / tenToTwelveA.length)*100;
        crowdScore_10_12 = 0.1;
      } else {
        // crowdAnalysis_10_12 = "unpredectable";
        crowdAnalysis_10_12 = 0;
        crowdScore_10_12 = 0;
      }

      if (lowCrowd_12_14 / totalCrowd_12_14 > 0.5) {
        // crowdAnalysis_12_14 = "low";
        crowdAnalysis_12_14 = (lowCrowd_12_14 / twelveToTwoP.length)*30;
        crowdScore_12_14 = 0.7;
      } else if (averageCrowd_12_14 / totalCrowd_12_14 > 0.5) {
        // crowdAnalysis_12_14 = "avg";
        crowdAnalysis_12_14 = (averageCrowd_12_14 / twelveToTwoP.length)*60;
        crowdScore_12_14 = 0.2;
      } else if (highCrowd_12_14 / totalCrowd_12_14 > 0.5) {
        // crowdAnalysis_12_14 = "high";
        crowdAnalysis_12_14 = (highCrowd_12_14 / twelveToTwoP.length)*60;
        crowdScore_12_14 = 0.1;
      } else {
        // crowdAnalysis_12_14 = "unpredectable";
        crowdAnalysis_12_14 = 0;
        crowdScore_12_14 = 0;
      }

      if (lowCrowd_14_16 / totalCrowd_14_16 > 0.5) {
        // crowdAnalysis_14_16 = "low";
        crowdAnalysis_14_16 = (lowCrowd_14_16 / twoToFourP.length)*30;
        crowdScore_14_16 = 0.7;
      } else if (averageCrowd_14_16 / totalCrowd_14_16 > 0.5) {
        // crowdAnalysis_14_16 = "avg";
        crowdAnalysis_14_16 = (averageCrowd_14_16 / twoToFourP.length)*60;
        crowdScore_14_16 = 0.2;
      } else if (highCrowd_14_16 / totalCrowd_14_16 > 0.5) {
        // crowdAnalysis_14_16 = "high";
        crowdAnalysis_14_16 = (highCrowd_14_16 / twoToFourP.length)*100;
        crowdScore_14_16 = 0.1;
      } else {
        // crowdAnalysis_14_16 = "unpredectable";
        crowdAnalysis_14_16 = 0;
        crowdScore_14_16 = 0;
      }

      if (lowCrowd_16_18 / totalCrowd_16_18 > 0.5) {
        // crowdAnalysis_16_18 = "low";
        crowdAnalysis_16_18 = (lowCrowd_16_18 / fourToSixP.length)*30;
        crowdScore_16_18 = 0.7;
      } else if (averageCrowd_16_18 / totalCrowd_16_18 > 0.5) {
        // crowdAnalysis_16_18 = "avg";
        crowdAnalysis_16_18 = (averageCrowd_16_18 / fourToSixP.length)*60;
        crowdScore_16_18 = 0.2;
      } else if (highCrowd_16_18 / totalCrowd_16_18 > 0.5) {
        // crowdAnalysis_16_18 = "high";
        crowdAnalysis_16_18 = (highCrowd_16_18 / fourToSixP.length)*100;
        crowdScore_16_18 = 0.1;
      } else {
        // crowdAnalysis_16_18 = "unpredectable";
        crowdAnalysis_16_18 = 0;
        crowdScore_16_18 = 0;
      }

      if (lowCrowd_18_20 / totalCrowd_18_20 > 0.5) {
        // crowdAnalysis_18_20 = "low";
        crowdAnalysis_18_20 = (lowCrowd_18_20 / sixToEightP.length)*30;
        crowdScore_18_20 = 0.7;
      } else if (averageCrowd_18_20 / totalCrowd_18_20 > 0.5) {
        // crowdAnalysis_18_20 = "avg";
        crowdAnalysis_18_20 = (averageCrowd_18_20 / sixToEightP.length)*60;
        crowdScore_18_20 = 0.2;
      } else if (highCrowd_18_20 / totalCrowd_18_20 > 0.5) {
        // crowdAnalysis_18_20 = "high";
        crowdAnalysis_18_20 = (highCrowd_18_20 / sixToEightP.length)*100;
        crowdScore_18_20 = 0.1;
      } else {
        // crowdAnalysis_18_20 = "unpredectable";
        crowdAnalysis_18_20 = 0;
        crowdScore_18_20 = 0;
      }

      if (lowCrowd_20_22 / totalCrowd_20_22 > 0.5) {
        // crowdAnalysis_20_22 = "low";
        crowdAnalysis_20_22 = (lowCrowd_20_22 / eightToTenP.length)*30;
        crowdScore_20_22 = 0.7;
      } else if (averageCrowd_20_22 / totalCrowd_20_22 > 0.5) {
        // crowdAnalysis_20_22 = "avg";
        crowdAnalysis_20_22 = (averageCrowd_20_22 / eightToTenP.length)*60;
        crowdScore_20_22 = 0.2;
      } else if (highCrowd_20_22 / totalCrowd_20_22 > 0.5) {
        // crowdAnalysis_20_22 = "high";
        crowdAnalysis_20_22 = (highCrowd_20_22 / eightToTenP.length)*100;
        crowdScore_20_22 = 0.1;
      } else {
        crowdAnalysis_20_22 = "unpredectable";
        crowdAnalysis_20_22 = 0;
        crowdScore_20_22 = 0;
      }

      if (lowCrowd_22_24 / totalCrowd_22_24 > 0.5) {
        // crowdAnalysis_22_24 = "low";
        crowdAnalysis_22_24 = (lowCrowd_22_24 / tenToTwelveP.length)*30;
        crowdScore_22_24 = 0.7;
      } else if (averageCrowd_22_24 / totalCrowd_22_24 > 0.5) {
        // crowdAnalysis_22_24 = "avg";
        crowdAnalysis_22_24 = (averageCrowd_22_24 / tenToTwelveP.length)*60;
        crowdScore_22_24 = 0.2;
      } else if (highCrowd_22_24 / totalCrowd_22_24 > 0.5) {
        // crowdAnalysis_22_24 = "high";
        crowdAnalysis_22_24 = (highCrowd_22_24 / tenToTwelveP.length)*100;
        crowdScore_22_24 = 0.1;
      } else {
        // crowdAnalysis_22_24 = "unpredectable";
        crowdAnalysis_22_24 = 0;
        crowdScore_22_24 = 0;
      }

      const crowdPrediction = {
        crowdAnalysis_12_2,
        crowdScore_12_2,
        crowdAnalysis_2_4,
        crowdScore_2_4,
        crowdAnalysis_4_6,
        crowdScore_4_6,
        crowdAnalysis_6_8,
        crowdScore_6_8,
        crowdAnalysis_8_10,
        crowdScore_8_10,
        crowdAnalysis_10_12,
        crowdScore_10_12,
        crowdAnalysis_12_14,
        crowdScore_12_14,
        crowdAnalysis_14_16,
        crowdScore_14_16,
        crowdAnalysis_16_18,
        crowdScore_16_18,
        crowdAnalysis_18_20,
        crowdScore_18_20,
        crowdAnalysis_20_22,
        crowdScore_20_22,
        crowdAnalysis_22_24,
        crowdScore_22_24,
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

module.exports = { futurecrowdScore };
