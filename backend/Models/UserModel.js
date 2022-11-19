const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserDetails = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferenceProfileCreated: {
    type: Boolean,
    required: true,
  },
  preferenceProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "preferenceProfiles",
    required: false,
  },
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedbacks",
      required: false,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserDetails.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "aaaabbbbccccddddeeeeffffggggtttt");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const UserProfile = mongoose.model("userdetails", UserDetails);
module.exports = UserProfile;
