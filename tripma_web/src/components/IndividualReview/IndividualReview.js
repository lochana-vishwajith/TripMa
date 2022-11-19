import React, { useState, useEffect } from "react";
import CustomPieChart from "./CustomPieChart";
import ReviewTable from "./ReviewTable";
import axios from "axios";
import "../ReviewsHome/ReviewsHome.css";

function IndividualReview() {
  const [reviewType, setReviewType] = useState();
  const [positiveFeedbacks, setPositiveFeedbacks] = useState([]);
  const [negativeFeedbacks, setNegativeFeedbacks] = useState([]);
  const [showPositiveTable, setShowPositiveTable] = useState(false);
  const [showNegativeTable, setShowNegativeTable] = useState(false);
  useEffect(() => {
    var reviewType = sessionStorage.getItem("reviewType");
    console.log("reviewType - ", reviewType);
    setReviewType(reviewType);
    // sessionStorage.clear();

    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback/positive-web")
      .then((res) => {
        var positiveFb = res.data.filter((review) => {
          return review.feedbackType === reviewType;
        });
        setPositiveFeedbacks(positiveFb);
        // console.log("positive - ", posFb);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback/negative-web")
      .then((res) => {
        var nagativeFb = res.data.filter((review) => {
          return review.feedbackType === reviewType;
        });
        setNegativeFeedbacks(nagativeFb);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = [
    { name: "Positive", value: positiveFeedbacks.length },
    { name: "Negative", value: negativeFeedbacks.length },
  ];

  const ShowTable = (type) => {
    if (type === "positive") {
      setShowNegativeTable(false);
      setShowPositiveTable(true);
    } else {
      setShowNegativeTable(true);
      setShowPositiveTable(false);
    }
    console.log("awaa - " + type);
  };

  return (
    <div className="container">
      <h1 className="PageHeader">{reviewType} Reviews Data</h1>
      <center>
        <CustomPieChart data={data} />
      </center>
      <div className="button-container">
        <div
          className="btn-reviews"
          onClick={() => {
            ShowTable("positive");
          }}
        >
          Positive
        </div>

        <div
          className="btn-reviews"
          onClick={() => {
            ShowTable("negative");
          }}
        >
          Negative
        </div>
      </div>
      <div style={{ marginTop: "5%" }}>
        {showPositiveTable ? (
          <ReviewTable type="Positive" feedbacks={positiveFeedbacks} />
        ) : null}
        {showNegativeTable ? (
          <ReviewTable type="Negative" feedbacks={negativeFeedbacks} />
        ) : null}
      </div>
    </div>
  );
}

export default IndividualReview;
