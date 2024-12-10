import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [guests, setGuests] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [roomServices, setRoomServices] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // Fetch data for each section from the API
    axios.get("http://localhost:5000/api/guests")
      .then((response) => setGuests(response.data))
      .catch((error) => console.error("Error fetching guests:", error));

    axios.get("http://localhost:5000/api/roomtypes")
      .then((response) => setRoomTypes(response.data))
      .catch((error) => console.error("Error fetching room types:", error));

    axios.get("http://localhost:5000/api/rooms")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));

    axios.get("http://localhost:5000/api/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));

    axios.get("http://localhost:5000/api/extraservices")
      .then((response) => setExtraServices(response.data))
      .catch((error) => console.error("Error fetching extra services:", error));

    axios.get("http://localhost:5000/api/payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));

    axios.get("http://localhost:5000/api/roomservices")
      .then((response) => setRoomServices(response.data))
      .catch((error) => console.error("Error fetching room services:", error));

    axios.get("http://localhost:5000/api/staff")
      .then((response) => setStaff(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Hotel Management System
      </h1>

      {/* Guests Table */}
      <TableSection title="Guests" data={guests} />

      {/* Room Types Table */}
      <TableSection title="Room Types" data={roomTypes} />

      {/* Rooms Table */}
      <TableSection title="Rooms" data={rooms} />

      {/* Bookings Table */}
      <TableSection title="Bookings" data={bookings} />

      {/* Extra Services Table */}
      <TableSection title="Extra Services" data={extraServices} />

      {/* Payments Table */}
      <TableSection title="Payments" data={payments} />

      {/* Room Services Table */}
      <TableSection title="Room Services" data={roomServices} />

      {/* Staff Table */}
      <TableSection title="Staff" data={staff} />
    </div>
  );
}

// Reusable TableSection Component with LocaleString Formatting
const TableSection = ({ title, data }) => {
  // Dynamically extract column names from the first object (keys of the object)
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Function to format any date field to LocaleString
  const formatDate = (value) => {
    // Check if value is a valid date
    const date = new Date(value);
    if (!isNaN(date)) {
      return date.toLocaleString(); // Return the date in localized string format
    }
    return value; // Return value as is if it's not a date
  };

  return (
    <section className="mb-12 mx-auto container">
      <h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-black">
          <thead className="bg-black text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="border border-black px-4 py-2">
                  {col.replace(/([A-Z])/g, ' $1').toUpperCase()} {/* Format column headers */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="border border-black px-4 py-2">
                      {formatDate(item[col])} {/* Format date fields */}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="border border-black px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default App;
