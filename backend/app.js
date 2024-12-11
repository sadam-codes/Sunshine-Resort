// server.js (Backend)

const express = require("express");
const mysql = require("mysql2");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sadam@123456789",
  database: "hotel_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Routes to fetch data from each table

// Get all guests
app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM guests", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all rooms
app.get("/api/rooms", (req, res) => {
  db.query("SELECT * FROM rooms", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all services
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all payments
app.get("/api/payments", (req, res) => {
  db.query("SELECT * FROM payments", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all staff members
app.get("/api/staff", (req, res) => {
  db.query("SELECT * FROM staff", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Run the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
