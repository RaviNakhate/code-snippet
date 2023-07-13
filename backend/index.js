// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set up Express app
app.use(bodyParser.json());
app.use(cors());

// Import routes
const submissionRoutes = require("./src/routes/submissions.js");
const authRoutes = require("./src/routes/auth");
// Routes
app.use("/submissions", submissionRoutes);
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_KEY, {
    // .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
