// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/key", async (req, res) => {
  try {
    res.status(201).send({ key: process.env.API_KEY });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
