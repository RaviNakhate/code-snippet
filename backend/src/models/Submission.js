// models/Submission.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  source_code: {
    type: String,
    required: true,
  },
  language_id: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
