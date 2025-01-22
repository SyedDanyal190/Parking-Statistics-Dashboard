require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 4001;

// Middleware to parse JSON requests
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

// Import routes
const parkingRoute = require("./routes/parkingRoute");
app.use("/api/parking", parkingRoute);



// Database connection check
const pool = require("./config/db");
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Database  connected:", res.rows[0]);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
