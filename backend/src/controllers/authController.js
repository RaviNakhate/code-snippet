// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ userName: username }, "secret-key");

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      token: token,
    });

    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ error: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, "secret-key");

    const updatedUser = await User.findByIdAndUpdate(
      user._id.toString(),
      { $set: { token } },
      { new: true }
    );

    // Return the token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
