require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const cookieParser = require("cookie-parser");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const globalRateLimiter = require("./middleware/globalRateLimiter");
const bookmarksRoute = require('./routes/bookmarks');
const cors = require("cors");

// mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Failed to connect to MongoDB', err);
});

module.exports = mongoose;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

// Apply global rate limiter to API routes
app.use("/api", globalRateLimiter);

// Bookmark Routes
app.use("/api/bookmarks", bookmarksRoute);

// Weather API Endpoint
app.post("/api/weather", async (req, res) => {
  try {
    const { city } = req.body;
    const apiKey = process.env.API_KEY;
    const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in /api/weather:", error);
    res.status(500).json({ error: "Error: Enter a real city :)" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
