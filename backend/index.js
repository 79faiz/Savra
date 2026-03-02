require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const teacherRoutes = require("./routes/teacherRoutes");
const statsRoutes = require("./routes/statsRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", teacherRoutes);
app.use("/api", statsRoutes);
app.use("/api", performanceRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));