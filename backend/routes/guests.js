const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Get all guests
router.get("/", (req, res) => {
  db.query("SELECT * FROM Guest", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Check for duplicate email, phone, or name
router.post("/check-duplicate", (req, res) => {
  const { FirstName, LastName, Phone, Email } = req.body;

  const query = `
    SELECT * FROM Guest 
    WHERE Email = ? OR Phone = ? OR (FirstName = ? AND LastName = ?)
  `;

  db.query(query, [Email, Phone, FirstName, LastName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      let error = "";
      const guest = results[0];
      if (guest.Email === Email) error = "Email";
      else if (guest.Phone === Phone) error = "Phone";
      else error = "Name";

      return res.status(400).json({ isDuplicate: true, error });
    }

    res.status(200).json({ isDuplicate: false });
  });
});
// Add a new guest
router.post("/", (req, res) => {
  const { FirstName, LastName, Phone, Email, Address, CNIC } = req.body;

  // Ensure all required fields are provided
  if (!FirstName || !LastName || !Phone || !Email || !CNIC) {
    return res
      .status(400)
      .json({
        error:
          "All fields (FirstName, LastName, Phone, Email, CNIC) are required.",
      });
  }

  const sql =
    "INSERT INTO Guest (FirstName, LastName, Phone, Email, Address, CNIC) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [FirstName, LastName, Phone, Email, Address, CNIC],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Guest added successfully",
        GuestID: result.insertId,
      });
    }
  );
});

// Update a guest
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Phone, Email, Address, CNIC } = req.body;

  // Ensure all required fields are provided
  if (!FirstName || !LastName || !Phone || !Email || !CNIC) {
    return res
      .status(400)
      .json({
        error:
          "All fields (FirstName, LastName, Phone, Email, CNIC) are required.",
      });
  }

  const sql =
    "UPDATE Guest SET FirstName = ?, LastName = ?, Phone = ?, Email = ?, Address = ?, CNIC = ? WHERE GuestID = ?";

  db.query(
    sql,
    [FirstName, LastName, Phone, Email, Address, CNIC, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Guest not found" });
      res.json({ message: "Guest updated successfully" });
    }
  );
});

// Delete a guest
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Guest WHERE GuestID = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Guest not found" });
    res.json({ message: "Guest deleted successfully" });
  });
});

module.exports = router;
