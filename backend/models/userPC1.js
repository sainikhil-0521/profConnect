const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { AlgoPC } = require("./AlgoPC");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

const UserPCSchema = {
  googleid: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true,
      unique: true,
      match:   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
  },
  profilePic: {
    type: String,
    default:
      "https://houserentals-properties-upload.s3.ap-south-1.amazonaws.com/image-1680887731952.jpeg",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
      require:true
  },
  dateOfBirth: {
    type: Date,
     require:true
  },
  country: {
    type: String,
     require:true
  },
  yearsOfExperience: {
    type: Number,
  },
  userType: {
    type: String,
    enum: ["free", "silver", "gold", "admin"],
    //  require:true,
    default: "free",
  },
  matchedProfiles: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userpc",
        // unique:true
      },
    ],
    default: [],
  },
  requested: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userpc",
        // unique:true
      },
    ],
    default: [],
  },
  following: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userpc",
        // unique:true
      },
    ],
    default: [],
  },
  blockedProfiles: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userpc",
        // unique:true
      },
    ],
    // default:[]
  },
  courseType: {
    type: String,
     require:true,
    enum: ["BTech", "Integrated-MTech", "MTech", "BCA", "BArch", "BSc"],
  },
  company: {
    type: String,
     require:true,
    //default:null
  },
  companyType: {
    type: String,
    enum: ["Service-based", "Product-based"],
    default: "Service-based",
  },
  role:{
    type: String,
    
  },
  interests:{
    type: String,
    
  },
  languages:{
    type: [],
    
  },
  summary:{
    type:String,
  },
  level: {
    type: String,
    enum: ["level0", "level1", "level2", "level3", "level4", "level5"],
    default: "level0",
  },
  domain: {
    type: String,
    enum: ["saas", "paas", "iaas"],
    default: "saas",
  },
  isOnline: { type: Boolean },
  createdOn: {
    type: Date,
    default: new Date(),
  },
};

const UserPC = mongoose.model("userpc", UserPCSchema); //models defined

module.exports = { UserPC };
