const PreferenceProfile = require("../Models/PreferenceProfileModel");
const User = require("../Models/UserModel");

const createPreferenceProfile = async (req, res) => {
  console.log("preference profile creating started");

  const {
    userId,
    ageValue,
    languageValue,
    budgetValue,
    transportValue,
    ageVariation,
    budgetVariation,
  } = req.body;

  try {
    const preferences = new PreferenceProfile({
      userId,
      ageValue,
      languageValue,
      budgetValue,
      transportValue,
      ageVariation,
      budgetVariation,
    });
    await preferences
      .save()
      .then(async (result) => {
        console.log("result : ", result);
        User.updateOne(
          { _id: userId },
          {
            $set: {
              preferenceProfileId: result._id,
              preferenceProfileCreated: true,
            },
          }
        )
          .then((results) => {
            console.log("profile creation success");
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log("profile creation failed with error : ", err);
            res.status(400).json("Error: " + err);
          });
      })
      .catch((err) => {
        console.log("profile creation failed with error : ", err);
        res.status(400).json("Error: " + err);
      });
  } catch (err) {
    console.log("profile creation failed with error : ", err);

    return res.status(500).send(err);
  }
};

const updatePreferences = async (req, res) => {
  const { id } = req.params;
  const { changed } = req.body;
  console.log("id : ", id);
  console.log("changed : ", changed);

  try {
    let updated = [];
    let updates = {};
    for (let i = 0; i < changed.length; i++) {
      updates[changed[i].name] = changed[i].value;
      updated = PreferenceProfile.updateOne(
        { _id: id },
        {
          $set: updates,
        }
      );
    }
    if (updated) {
      console.log("profile creation success");
      res.status(200).json(results);
    } else {
      console.log("profile creation failed with error : ", err);
      res.status(400).json("Error: " + err);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { createPreferenceProfile, updatePreferences };
