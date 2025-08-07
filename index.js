const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const entryRoutes = require("./routes/entries");
const userRoutes = require("./routes/users");
const topicRoutes = require("./routes/topics");

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,

    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.use("/api/codes", entryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
