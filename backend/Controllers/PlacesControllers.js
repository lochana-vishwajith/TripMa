const PlacesDetailsModel = require("../Models/PlacesModel");

const addPlaces = async (req, res) => {
  const { name, description, location, image } = req.body;

  try {
    const placeDetail = new PlacesDetailsModel({
      name,
      description,
      location,
      image,
    });
    await placeDetail
      .save()
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllPlaces = async (req, res) => {
  try {
    await PlacesDetailsModel.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};
module.exports = { addPlaces, getAllPlaces };
