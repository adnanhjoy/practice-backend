const mongoose = require("mongoose");
// const tutorial = require("../validator/tutorial");
const Schema = mongoose.Schema;

//Create Schema
const TutorialSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean
  },
  cardpicture: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
  },
  introVideoDescription: {
    type: String,
  },
  activate: {
    type: Boolean,
    default: false
  },
  tutorialVideo: {
    type: String,
  },
  facilities: [
    {
      type: String
    }
  ],
  courseModule: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Tutorial = mongoose.model("tutorial", TutorialSchema);