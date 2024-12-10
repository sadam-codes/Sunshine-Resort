const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost", // Your database host
  user: "root", // Your database username
  password: "sadam@123456789", // Your database password
  database: "hotelmanagement", // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Routes to fetch data from each table
app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM Guest", (err, results) => {
    if (err) {
      console.error("Error fetching guests:", err);
      res.status(500).json({ error: "Error fetching guests" }); // Send error response
    } else {
      res.json(results);
    }
  });
});

// Add the same for other routes

app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM Bookings", (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).json({ error: "Error fetching bookings" }); // Send error response
    } else {
      res.json(results);
    }
  });
});

app.get("/api/extraservices", (req, res) => {
  db.query("SELECT * FROM ExtraServices", (err, results) => {
    if (err) {
      console.error("Error fetching extra services:", err);
      res.status(500).json({ error: "Error fetching extra services" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/payments", (req, res) => {
  db.query("SELECT * FROM Payments", (err, results) => {
    if (err) {
      console.error("Error fetching payments:", err);
      res.status(500).json({ error: "Error fetching payments" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/roomservices", (req, res) => {
  db.query("SELECT * FROM RoomService", (err, results) => {
    if (err) {
      console.error("Error fetching room services:", err);
      res.status(500).json({ error: "Error fetching room services" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/staff", (req, res) => {
  db.query("SELECT * FROM Staff", (err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      res.status(500).json({ error: "Error fetching staff" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/roomtypes", (req, res) => {
  db.query("SELECT * FROM RoomType", (err, results) => {
    if (err) {
      console.error("Error fetching room types:", err);
      res.status(500).json({ error: "Error fetching room types" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/rooms", (req, res) => {
  db.query("SELECT * FROM Room", (err, results) => {
    if (err) {
      console.error("Error fetching rooms:", err);
      res.status(500).json({ error: "Error fetching rooms" });
    } else {
      res.json(results);
    }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
