import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewsHome.css";

import {
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function ReviewHome() {
  const [positiveBuddyCount, setPositiveBuddyCount] = useState(0);
  const [negativeBuddyCount, setNegativeBuddyCount] = useState(0);
  const [positiveAttractionCount, setPositiveAttractionCount] = useState(0);
  const [negativeAttractionCount, setNegativeAttractionCount] = useState(0);
  const [positiveRouteCount, setPositiveRouteCount] = useState(0);
  const [negativeRouteCount, setNegativeRouteCount] = useState(0);
  const [positiveOtherCount, setPositiveOtherCount] = useState(0);
  const [negativeOtherCount, setNegativeOtherCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://travel-buddy-research.herokuapp.com/feedback")
      .then((response) => {
        console.log(response.data);
        getReviewCounts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getReviewCounts = (data) => {
    //Attraction positive count
    const attPosCount = data
      .filter((review) => {
        return review.feedbackType === "Attraction";
      })
      .filter((review) => {
        return review.sentimentValue === "positive";
      });
    setPositiveAttractionCount(attPosCount.length);
    //Attraction negative count
    const attNegCount = data
      .filter((review) => {
        return review.feedbackType === "Attraction";
      })
      .filter((review) => {
        return review.sentimentValue === "negative";
      });
    setNegativeAttractionCount(attNegCount.length);
    // Buddy positive count
    const buddyPosCount = data
      .filter((review) => {
        return review.feedbackType === "Buddy";
      })
      .filter((review) => {
        return review.sentimentValue === "positive";
      });
    setPositiveBuddyCount(buddyPosCount.length);
    // Buddy negative count
    const buddyNegCount = data
      .filter((review) => {
        return review.feedbackType === "Buddy";
      })
      .filter((review) => {
        return review.sentimentValue === "negative";
      });
    setNegativeBuddyCount(buddyNegCount.length);
    // Route positive count
    const routePosCount = data
      .filter((review) => {
        return review.feedbackType === "Route";
      })
      .filter((review) => {
        return review.sentimentValue === "positive";
      });
    setPositiveRouteCount(routePosCount.length);
    // Route negative count
    const routeNegCount = data
      .filter((review) => {
        return review.feedbackType === "Route";
      })
      .filter((review) => {
        return review.sentimentValue === "negative";
      });
    setNegativeRouteCount(routeNegCount.length);

    // Other positive count
    const otherPosCount = data
      .filter((review) => {
        return review.feedbackType === "Other";
      })
      .filter((review) => {
        return review.sentimentValue === "positive";
      });
    setPositiveOtherCount(otherPosCount.length);
    // Other negative count
    const otherNegCount = data
      .filter((review) => {
        return review.feedbackType === "Other";
      })
      .filter((review) => {
        return review.sentimentValue === "negative";
      });
    setNegativeOtherCount(otherNegCount.length);
  };

  const data = [
    {
      name: "Buddy",
      positive: positiveBuddyCount,
      negative: negativeBuddyCount,
      amt: 2400,
    },
    {
      name: "Attraction",
      positive: positiveAttractionCount,
      negative: negativeAttractionCount,
      amt: 2210,
    },
    {
      name: "Route",
      positive: positiveRouteCount,
      negative: negativeRouteCount,
      amt: 2290,
    },
    {
      name: "Other",
      positive: positiveOtherCount,
      negative: negativeOtherCount,
      amt: 2290,
    },
  ];
  ///////////////////////
  const ClickButtons = (type) => {
    console.log("awaa - " + type);
    sessionStorage.setItem("reviewType", type);
    window.location = "/individual-review";
  };

  return (
    <div className="container">
      <h1 className="PageHeader">Reviews Dashboard</h1>
      <center>
        <div style={{ marginTop: "5%" }}>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" fill="#82ca9d" />
            <Bar dataKey="negative" fill="#EE4B2B" />
          </BarChart>
        </div>
      </center>
      <div className="button-container">
        <div
          className="btn-reviews"
          onClick={() => {
            ClickButtons("Buddy");
          }}
        >
          Buddy
        </div>

        <div
          className="btn-reviews"
          onClick={() => {
            ClickButtons("Attraction");
          }}
        >
          Attraction
        </div>
        <div
          className="btn-reviews"
          onClick={() => {
            ClickButtons("Route");
          }}
        >
          Route
        </div>
        <div
          className="btn-reviews"
          onClick={() => {
            ClickButtons("Other");
          }}
        >
          Other
        </div>
      </div>
    </div>
  );
}

export default ReviewHome;
