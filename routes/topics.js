const express = require("express");
const router = express.Router();
const CodeEntry = require("../models/CodeEntry");
const User = require("../models/User");
const verifyFirebaseToken = require("../middleware/VerifyFirebase");

// GET topics by user email
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }

    // Check email matches token's email
    if (req.decoded.email !== userEmail) {
      return res
        .status(403)
        .json({ message: "Forbidden: Email does not match token" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const topics = await CodeEntry.find({ userEmail });
    res.json(topics);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get topic codes by user
router.get("/codes", verifyFirebaseToken, async (req, res) => {
  try {
    const { email, topic } = req.query;
    if (!email || !topic) {
      return res
        .status(400)
        .json({ message: "Email and topic query params required" });
    }
    const codes = await CodeEntry.find({ userEmail: email, topic });
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
