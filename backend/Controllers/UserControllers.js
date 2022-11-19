const UserProfile = require("../Models/UserModel");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log("register user");
  const {
    fullName,
    email,
    phoneNumber,
    DOB,
    occupation,
    skills,
    password,
    image,
    country,
  } = req.body;
  try {
    await UserProfile.findOne({ email: email }).then((emailIsAvilable) => {
      if (!emailIsAvilable) {
        bycrpt.hash(password, 10).then((hash) => {
          const UserDetails = new UserProfile({
            fullName,
            email,
            phoneNumber,
            DOB,
            occupation,
            skills,
            password: hash,
            image,
            country,
            preferenceProfileCreated: false,
          });

          UserDetails.save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((error) => {
              res.status(400).json("Error: " + error);
            });
        });
      } else {
        return res.status(500).send("Email is already exsits");
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`email ${email} password ${password}`);

  const user = await UserProfile.findOne({ email: email });

  if (user) {
    const isMatch = await bycrpt.compare(password, user.password);

    const token = await user.generateAuthToken();

    res.cookie("JWTToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!isMatch) {
      console.log("Password is Incorrect");
      res.json({ error: "Login Failed" });
    } else if (!user) {
      console.log("email is Incorrect");
      res.json({ error: "Login Failed" });
    } else {
      const userDetails = await UserProfile.findOne({ email: email }).populate(
        "preferenceProfileId",
        "_id ageValue languageValue budgetValue transportValue"
      );

      console.log("Login Successful");
      res.json({ message: "Login Successful", user: userDetails });
    }
  } else {
    console.log("email is Incorrect");
    res.status(500).json({ error: "Email not found" });
  }
};

const logOutUser = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("userlogged out", id);

    await UserProfile.updateOne(
      { _id: id },
      {
        $set: { tokens: [] },
      }
    )
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

const getUserDetails = async (req, res) => {
  console.log("fetching user details");
  const { id } = req.params;
  try {
    await UserProfile.findById(id)
      .populate(
        "preferenceProfileId",
        "_id ageValue languageValue budgetValue transportValue"
      )
      .then((result) => {
        console.log("user details fetched");
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log("user details not fetched : ", error);

        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { registerUser, loginUser, logOutUser, getUserDetails };
