const mongoose = require("mongoose");
require("dotenv").config();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { deflate } = require("zlib");

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      defalut: null,
    },
  },
  {
    timestamps: true,
  }
);

userschema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRETKEY);
  this.token = token;
  await this.save();
  return token;
};

userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = new mongoose.model("user", userschema);
module.exports = User;
