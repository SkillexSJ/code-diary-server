const mongoose = require("mongoose");

const codeEntrySchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "C++",
    },
    tags: {
      type: [String],
      default: [],
    },
    approach: {
      type: String,
      default: "",
    },

    problem_link: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "codes",
  }
);

module.exports = mongoose.model("CodeEntry", codeEntrySchema);
