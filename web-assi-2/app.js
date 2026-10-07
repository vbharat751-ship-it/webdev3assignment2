const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Modular student routes
app.use("/students", studentRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running"
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
