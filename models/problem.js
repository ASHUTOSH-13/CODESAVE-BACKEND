const mongoose = require("mongoose");

const options = {
  timestamps: true,
};

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    solution: {
      type: String,
    },
    tags: [String],
    notes: String,
  },
  options
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
