const { Pool } = require("pg");
require("dotenv").config(); // Make sure to include this at the top

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  // host: process.env.DB_HOST || 'localhost',
  host: process.env.DB_HOST || "159.203.138.243", // Only the IP address
  database: process.env.DB_NAME || "TrafficDB",
  password: process.env.DB_PASSWORD || "Dashboard",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
