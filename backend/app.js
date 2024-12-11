const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sadam@123456789",
  database: "hotelsystem",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

//////////////////////////
// Admin Statistics
//////////////////////////

// Count available rooms
app.get("/api/admin/available-rooms", (req, res) => {
  db.query(
    'SELECT COUNT(*) AS availableRooms FROM rooms WHERE status = "available"',
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(result[0]);
    }
  );
});

// Count guests who stayed in the last week
app.get("/api/admin/guests-last-week", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS guestsLastWeek FROM bookings WHERE check_in_date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)",
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(result[0]);
    }
  );
});

// Count guests who stayed in the last month
app.get("/api/admin/guests-last-month", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS guestsLastMonth FROM bookings WHERE check_in_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)",
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(result[0]);
    }
  );
});

// Get all statistics in one call
app.get("/api/admin/stats", (req, res) => {
  const query = `
      SELECT 
          (SELECT COUNT(*) FROM rooms WHERE status = 'available') AS availableRooms,
          (SELECT COUNT(*) FROM bookings WHERE check_in_date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)) AS guestsLastWeek,
          (SELECT COUNT(*) FROM bookings WHERE check_in_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AS guestsLastMonth,
          (SELECT COUNT(*) FROM guests) AS totalGuests,
          (SELECT COUNT(*) FROM rooms) AS totalRooms
  `;
  db.query(query, (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result[0]);
  });
});

//////////////////////////
// Guests CRUD Operations
//////////////////////////
app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM guests", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/guests", (req, res) => {
  const { name, email, phone, address } = req.body;
  db.query(
    "INSERT INTO guests (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Guest added", guestId: result.insertId });
    }
  );
});

//////////////////////////
// Rooms CRUD Operations
//////////////////////////
app.get("/api/rooms", (req, res) => {
  db.query("SELECT * FROM rooms", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/rooms", (req, res) => {
  const { room_number, type, price, status } = req.body;
  db.query(
    "INSERT INTO rooms (room_number, type, price, status) VALUES (?, ?, ?, ?)",
    [room_number, type, price, status],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Room added", roomId: result.insertId });
    }
  );
});

//////////////////////////
// Bookings CRUD Operations
//////////////////////////
app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/bookings", (req, res) => {
  const { guest_id, room_id, check_in_date, check_out_date } = req.body;
  db.query(
    "INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)",
    [guest_id, room_id, check_in_date, check_out_date],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Booking added", bookingId: result.insertId });
    }
  );
});

//////////////////////////
// Services CRUD Operations
//////////////////////////
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/services", (req, res) => {
  const { service_name, description, price } = req.body;
  db.query(
    "INSERT INTO services (service_name, description, price) VALUES (?, ?, ?)",
    [service_name, description, price],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Service added", serviceId: result.insertId });
    }
  );
});

//////////////////////////
// Payments CRUD Operations
//////////////////////////
app.get("/api/payments", (req, res) => {
  db.query("SELECT * FROM payments", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/payments", (req, res) => {
  const { booking_id, amount, payment_date, payment_method } = req.body;
  db.query(
    "INSERT INTO payments (booking_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)",
    [booking_id, amount, payment_date, payment_method],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Payment added", paymentId: result.insertId });
    }
  );
});

//////////////////////////
// Staff CRUD Operations
//////////////////////////
app.get("/api/staff", (req, res) => {
  db.query("SELECT * FROM staff", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post("/api/staff", (req, res) => {
  const { name, role, phone, email } = req.body;
  db.query(
    "INSERT INTO staff (name, role, phone, email) VALUES (?, ?, ?, ?)",
    [name, role, phone, email],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else
        res
          .status(201)
          .json({ message: "Staff added", staffId: result.insertId });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
