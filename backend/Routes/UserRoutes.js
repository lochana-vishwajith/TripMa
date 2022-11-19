const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logOutUser,
  getUserDetails,
} = require("../Controllers/UserControllers");

//@route  POST /user
//@desc   Add Users
//@access Public
router.post("/", registerUser);

//@route  POST /users/login
//@desc   Login User
//@access Public
router.post("/login", loginUser);

//@route  POST /users/login
//@desc   Login User
//@access Public
router.put("/logOutUser/:id", logOutUser);

//@route  GET /users/getUserDetails
//@desc   getUserDetails User
//@access Public
router.get("/getUserDetails/:id", getUserDetails);

module.exports = router;
