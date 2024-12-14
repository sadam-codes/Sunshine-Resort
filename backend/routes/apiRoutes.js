// routes/api.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get guest details with related data
router.get("/api/guests", (req, res) => {
  const query = `
    SELECT 
      guests.id,
      guests.name AS guest_name,
      guests.email,
      guests.phone,
      guests.address,
      rooms.room_number,
      rooms.type AS room_type,
      bookings.check_in,
      bookings.check_out,
      payments.amount,
      payments.payment_date
    FROM guests
    LEFT JOIN rooms ON guests.room_id = rooms.id
    LEFT JOIN bookings ON guests.id = bookings.guest_id
    LEFT JOIN payments ON guests.id = payments.guest_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching guest details:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ data: results });
  });
});

app.post("/api/guests", (req, res) => {
  const {
    guest_name,
    email,
    phone,
    address,
    room_number,
    room_type,
    check_in,
    check_out,
    amount,
    payment_date,
  } = req.body;

  // Ensure data is being passed correctly
  if (
    !guest_name ||
    !email ||
    !phone ||
    !address ||
    !room_number ||
    !room_type ||
    !check_in ||
    !check_out ||
    !amount ||
    !payment_date
  ) {
    return res.status(400).send("Missing required fields");
  }

  // Save the guest data to the database here...

  res.status(200).send("Guest added successfully!");
});

module.exports = router;
