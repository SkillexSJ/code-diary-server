const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyFirebaseToken = require("../middleware/VerifyFirebase");


//  POST /api/users
//  Register a new user
router.post("/", async (req, res) => {
  try {
    // Check if user already exists
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // send the full body
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET /api/users

router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a user by email

router.get("/:email", verifyFirebaseToken, async (req, res) => {
  if (req.decoded.email !== req.params.email) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only access your own user data" });
  }
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
