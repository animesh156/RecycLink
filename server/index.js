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

app.use("/api/user", userRoutes); // user route /user/register or login
app.use("/api/waste", wasteRoutes);
app.use("/api/buyer", protect, buyersRoutes);
app.use("/api", protect, earningRoutes);



app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
