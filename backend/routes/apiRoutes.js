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
      guests.id_card,
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

router.post("/api/guests", (req, res) => {
  const {
    guest_name,
    email,
    phone,
    id_card, 
    address,
    room_number,
    room_type,
    check_in,
    check_out,
    amount,
    payment_date,
  } = req.body;

  // Validate required fields
  if (
    !guest_name ||
    !email ||
    !phone ||
    !id_card ||
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

  // Insert room data into rooms table
  const insertRoomQuery = `
    INSERT INTO rooms (room_number, type)
    VALUES (?, ?)
  `;

  db.query(insertRoomQuery, [room_number, room_type], (err, roomResult) => {
    if (err) {
      console.error("Error inserting room data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const roomId = roomResult.insertId; // Get the newly inserted room ID

    // Insert guest data into guests table with the associated room ID
    const insertGuestQuery = `
      INSERT INTO guests (name, email, phone, id_card, address, room_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertGuestQuery,
      [guest_name, email, phone, id_card,  address, roomId],
      (err, guestResult) => {
        if (err) {
          console.error("Error inserting guest data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        const guestId = guestResult.insertId;

        // Insert booking and payment data
        const insertBookingQuery = `
          INSERT INTO bookings (guest_id, check_in, check_out)
          VALUES (?, ?, ?)
        `;

        const insertPaymentQuery = `
          INSERT INTO payments (guest_id, amount, payment_date)
          VALUES (?, ?, ?)
        `;

        db.query(insertBookingQuery, [guestId, check_in, check_out], (err) => {
          if (err) {
            console.error("Error inserting booking data:", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          db.query(
            insertPaymentQuery,
            [guestId, amount, payment_date],
            (err) => {
              if (err) {
                console.error("Error inserting payment data:", err);
                return res.status(500).json({ error: "Internal server error" });
              }

              res.status(200).send("Guest added successfully!");
            }
          );
        });
      }
    );
  });
});

module.exports = router;
