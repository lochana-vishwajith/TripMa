const LocationDetail = require("../Models/LocationDetailsModel");

const addLocationDetails = async (req, res) => {
  console.log("add ocation details adding");
  const { locationName, locationPlace, description, image } = req.body;

  try {
    const details = new LocationDetail({
      locationName,
      locationPlace,
      description,
      image,
    });

    await details
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

const getLocationDetail = async (req, res) => {
  try {
    await LocationDetail.find()
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

const getLocationDetailById = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    await LocationDetail.findById(id)
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

module.exports = {
  addLocationDetails,
  getLocationDetailById,
  getLocationDetail,
};
