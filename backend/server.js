// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const apiRoutes = require("./routes/apiRoutes");

app.use(cors());
app.use(express.json());

app.use(apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

