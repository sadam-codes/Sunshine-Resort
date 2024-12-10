const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Your MySQL username
  password: 'sadam@123456789',      // Your MySQL password
  database: 'hostelmanagement', // Database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
