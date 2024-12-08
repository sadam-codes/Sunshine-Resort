const express = require("express");
const cors = require("cors");
const guestsRoute = require("./routes/guests");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/guests", guestsRoute);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
