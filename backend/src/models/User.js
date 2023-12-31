const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
  },
  source_code: {
    type: String,
    required: true,
  },
  token_key: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
