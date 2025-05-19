const express = require("express");
const activityRoutes = require("./routes/userActivityRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/activities", activityRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
