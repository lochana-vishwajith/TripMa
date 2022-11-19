const FeedbackModel = require("../Models/FeedbackModel");
const UserProfile = require("../Models/UserModel");
const axios = require("axios");

const validateFeedback = async (req, res) => {
  const { feedback, rating } = req.body;

  axios
    .post("https://tripma-nlp-custom-model.herokuapp.com/sentiment", {
      rate: rating,
      feedback: feedback,
    })
    .then((response) => {
      console.log(response.data);
      var disition = response.data.finalDisition;
      var sentiment = response.data.sentimentValue;
      if (disition == "reject") {
        return res.send("Rejected");
      } else {
        addFeedback(req, res, sentiment);
      }
    })
    .catch((error) => {
      console.log("validatefeedback Error - ", error);
    });
};

const addFeedback = async (req, res, sentiment) => {
  const {
    userID,
    feedback,
    feedbackType,
    date,
    likes,
    sentimentValue,
    rating,
  } = req.body;

  try {
    const userFeedback = FeedbackModel({
      userID,
      feedback,
      feedbackType,
      date,
      likes,
      sentimentValue: sentiment,
      rating,
    });

    await userFeedback
      .save()
      .then((result) => {
        UserProfile.findByIdAndUpdate(
          userID,
          {
            $push: { feedbacks: result._id },
          },
          { new: true }
        )
          .then(() => {
            console.log("review added to user");
          })
          .catch((err) => {
            console.log("the error = ", err);
          });

        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send(err);
  }
};

const getFeedbacks = async (req, res) => {
  try {
    await FeedbackModel.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getPositiveFeedbacks = async (req, res) => {
  await FeedbackModel.find()
    .then((result) => {
      const finalResult = result.filter((obj) => {
        return obj.sentimentValue == "positive";
      });
      // console.log(finalResult);
      res.status(200).send(finalResult);
    })
    .catch((err) => console.log(err));
};

const getPositiveFeedbacksWeb = async (req, res) => {
  // try {
  await FeedbackModel.find()
    .populate("userID", "fullName , email, phoneNumber")
    .then((result) => {
      const finalResult = result.filter((obj) => {
        return obj.sentimentValue == "positive";
      });
      console.log(finalResult);
      res.status(200).send(finalResult);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
  // } catch (err) {
  //   console.log(err.message);
  //   return res.status(500).send("Server Error");
  // }
};

const getNegativeFeedbacks = async (req, res) => {
  try {
    await FeedbackModel.find().then((result) => {
      const finalResult = result.filter((obj) => {
        return obj.sentimentValue == "negative";
      });
      //console.log(finalResult);
      res.status(200).send(finalResult);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const getNegativeFeedbacksWeb = async (req, res) => {
  await FeedbackModel.find()
    .populate("userID", "fullName , email, phoneNumber")
    .then((result) => {
      const finalResult = result.filter((obj) => {
        return obj.sentimentValue == "negative";
      });
      console.log(finalResult);
      res.status(200).send(finalResult);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

const deleteFeedback = async (req, res) => {
  const { userID, feedbackID } = req.body;
  try {
    await FeedbackModel.findByIdAndDelete(feedbackID)
      .then((result) => {
        UserProfile.findByIdAndUpdate(
          userID,
          {
            $pull: { feedbacks: result._id },
          },
          { new: true }
        )
          .then(() => {
            console.log("review removed to user");
          })
          .catch((err) => {
            console.log("the error = ", err);
          });
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).send("Server Error");
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
};

const likeFeedback = async (req, res) => {
  const { userID, feedbackID } = req.body;
  try {
    //check if already liked
    const post = await FeedbackModel.findById(feedbackID);

    const likedStatus = post.likes.filter((likedID) => {
      return likedID == userID;
    });
    if (likedStatus.length > 0) {
      console.log(likedStatus);
      return res.status(200).send("already liked");
    } else {
      console.log("liked");
      await FeedbackModel.findByIdAndUpdate(
        feedbackID,
        {
          $push: { likes: userID },
        },
        { new: true }
      )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          console.log("Like error - ", error);
          res.status(500).send(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const removeFeedbackLike = async (req, res) => {
  const { userID, feedbackID } = req.body;
  try {
    //check if already disliked
    const post = await FeedbackModel.findById(feedbackID);

    const likedStatus = post.likes.filter((likedID) => {
      return likedID == userID;
    });

    if (likedStatus.length > 0) {
      await FeedbackModel.findByIdAndUpdate(
        feedbackID,
        {
          $pull: { likes: userID },
        },
        { new: true }
      )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          console.log("dislike error -", error);
          res.status(500).send(error);
        });
    } else {
      return res.status(200).send("already disliked");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
  likeFeedback,
  removeFeedbackLike,
  validateFeedback,
  getPositiveFeedbacks,
  getNegativeFeedbacks,
  getPositiveFeedbacksWeb,
  getNegativeFeedbacksWeb,
};
