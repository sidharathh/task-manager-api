require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middlewares/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorMiddlewares");

const app = express();
// Connect Database
connectDB();
// Middleware to read JSON
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});