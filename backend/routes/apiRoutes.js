// routes/api.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");



// Insert guest data
router.post("/api/guests", (req, res) => {
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

  // Validate required fields
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

  // Step 1: Insert room data into the rooms table
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

    // Step 2: Insert guest data into the guests table with the associated room ID
    const insertGuestQuery = `
      INSERT INTO guests (name, email, phone, address, room_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertGuestQuery,
      [guest_name, email, phone, address, roomId],
      (err, guestResult) => {
        if (err) {
          console.error("Error inserting guest data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        const guestId = guestResult.insertId;

        // Step 3: Insert booking and payment data
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
