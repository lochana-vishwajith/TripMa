const companiondetailsModel = require("../Models/CompanionshipModel");

const postCompanionship = async (req, res) => {
  const { userId, companionId, startDate, requestId, endedby } = req.body;
  try {
    const companionshipdetails = new companiondetailsModel({
      userId,
      companionId,
      startDate,
      companionStatus: "started",
      requestId,
      endedby,
    });

    await companionshipdetails
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllCompanionships = async (req, res) => {
  const { id } = req.params;
  try {
    await companiondetailsModel
      .find({ $or: [{ userId: id }, { companionId: id }] })
      .populate("userId", "fullName phoneNumber image")
      .populate("companionId", "fullName phoneNumber image")
      .populate("requestId", "tripdate destination budget")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteCompanionship = async (req, res) => {
  const { id } = req.params;

  try {
    await companiondetailsModel
      .findByIdAndRemove(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const setReviewedUser = async (req, res) => {
  const { id } = req.params;
  const { reviewedId } = req.body;
  try {
    await companiondetailsModel
      .updateOne(
        { _id: id },
        {
          $set: { endedby: [reviewedId] },
        }
      )
      .then(async (result) => {
        if (endedby.length > 1) {
          await companiondetailsModel
            .updateOne(
              { _id: id },
              {
                $set: { companionStatus: "completed" },
              }
            )
            .then((responses) => {
              res.status(200).json(result, responses);
            })
            .catch((error) => {
              res.status(400).json("Error: " + error);
            });
        }
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  postCompanionship,
  getAllCompanionships,
  deleteCompanionship,
  setReviewedUser,
};
