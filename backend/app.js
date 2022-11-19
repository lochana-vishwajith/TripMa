const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

const PORT = process.env.PORT || 5000;
const url = process.env.MONGODB_URL;

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
} catch (error) {
  console.log(error.message);

  //Exit Process with failure
  process.exit(1);
}
app.get("/", (req, res) => res.send("Travel buddy apiis running"));

app.use("/places", require("./Routes/PlacesRoute"));
app.use("/feedback", require("./Routes/FeedbackRoute"));
app.use("/user", require("./Routes/UserRoutes"));
app.use("/buddy", require("./Routes/BuddyRequetRoutes"));
app.use("/companionship", require("./Routes/CompanionshipRoutes"));
app.use("/safetyIndex", require("./Routes/SafetyIndexRoutes"));
app.use("/liveIssue", require("./Routes/LiveIssueRoutes"));
app.use("/liveCrowd", require("./Routes/LiveCrowdRoutes"));
app.use("/safetysug", require("./Routes/SafetySuggestionRoutes"));
app.use("/prefprofile", require("./Routes/PreferenceProfileRoutes"));
app.use("/safetyIndexpreferences", require("./Routes/SafetyPreferances"));
app.use("/buddyReviews", require("./Routes/BuddyReviewRoutes"));
app.use("/locationDetails", require("./Routes/LocationDetailRoutes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
