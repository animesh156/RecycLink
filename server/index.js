const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
var cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const buyersRoutes = require("./routes/buyersRoutes");
const earningRoutes = require("./routes/earningRoutes");
const mongoose = require("mongoose");


const { protect } = require("./middleware/authMiddleware");

connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://recyc-link-beta.vercel.app"], // Array for multiple origins
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}h ${mins}m ${secs}s`;
}

function getISTTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
}

//  Health check endpoint
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const status = dbState === 1 ? "healthy" : "unhealthy";

  const uptimeInSeconds = process.uptime();

  res.status(status === "healthy" ? 200 : 500).json({
    status,
    timestampIST: getISTTimestamp(),
    uptime: formatUptime(uptimeInSeconds),
    database: {
      state: dbState,
      description: dbState === 1 ? "Connected" : "Not Connected ❌",
    },
  });
});

app.use("/api/user", userRoutes); // user route /user/register or login
app.use("/api/waste", wasteRoutes);
app.use("/api/buyer", protect, buyersRoutes);
app.use("/api", protect, earningRoutes);



app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
