const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

// Create a new submission
router.post("/", async (req, res) => {
  try {
    const { source_code, username } = req.body;
    const { token } = req.headers;

    // Create a new submission
    const user = await User.findOne({ username, token });
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    const updatedUserCode = await User.findByIdAndUpdate(
      user._id.toString(),
      { $set: { source_code } },
      { new: true }
    );

    const data = {
      key: process.env.API_KEY,
    };
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a submission by ID
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { token } = req.headers;

    const user = await User.findOne({ username, token });
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/setTokenKey", async (req, res) => {
  try {
    const { token_key, username } = req.body;
    const { token } = req.headers;

    // Create a new submission
    const user = await User.findOne({ username, token });
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    const updatedUserCode = await User.findByIdAndUpdate(user._id.toString(), {
      $set: { token_key: token_key },
    });

    const data = {
      status: "success",
    };
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
