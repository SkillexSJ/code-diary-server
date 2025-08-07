const express = require("express");
const router = express.Router();
const CodeEntry = require("../models/CodeEntry");
const User = require("../models/User");
const verifyFirebaseToken = require("../middleware/VerifyFirebase");

// POST: Create a new code entry
router.post("/", verifyFirebaseToken, async (req, res) => {
  const {
    userEmail,
    title,
    topic,
    code,
    language,
    tags,
    approach,
    problem_link,
  } = req.body;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const newEntry = new CodeEntry({
      userEmail,
      Author: user.name,
      title,
      topic,
      code,
      language,
      tags,
      approach,
      problem_link,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Get all code entries
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const entries = await CodeEntry.find();
    res.json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Get code entry by id
router.get("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const entry = await CodeEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update code entry by id
router.put("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const entry = await CodeEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete code entry by id
router.delete("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const entry = await CodeEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
