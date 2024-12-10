const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost", // your database host
  user: "root", // your database username
  password: "sadam@123456789", // your database password
  database: "hotelmanagement", // your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

// Routes to fetch data from each table
app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM Guest", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/roomtypes", (req, res) => {
  db.query("SELECT * FROM RoomType", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/rooms", (req, res) => {
  db.query("SELECT * FROM Room", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM Bookings", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/payments", (req, res) => {
  db.query("SELECT * FROM Payments", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/staff", (req, res) => {
  db.query("SELECT * FROM Staff", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/roomservices", (req, res) => {
  db.query("SELECT * FROM RoomService", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/extraservices", (req, res) => {
  db.query("SELECT * FROM ExtraServices", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
