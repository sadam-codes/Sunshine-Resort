import React, { useEffect, useState } from "react";
import axios from "axios";
import AddGuestForm from "./AddGuestForm";

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  const fetchGuests = () => {
    axios
      .get("http://localhost:5000/api/guests")
      .then((res) => setGuests(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // Function to format dates in a readable format
  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Receptionist Dashboard</h1>

      <AddGuestForm onGuestAdded={fetchGuests} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {guests.map((guest) => (
          <div
            key={guest.id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
          >
            <h2 className="text-xl font-bold mb-2">{guest.guest_name}</h2>
            <p className="text-gray-600 text-bold">Email: {guest.email}</p>
            <p className="text-gray-600">Phone: {guest.phone}</p>
            <p className="text-gray-600">ID Card: {guest.id_card}</p>
            <p className="text-gray-600">Address: {guest.address}</p>
            <p className="text-gray-600">
              Room Number: {guest.room_number || "N/A"}
            </p>
            <p className="text-gray-600">
              Room Type: {guest.room_type || "N/A"}
            </p>
            <p className="text-gray-600">
              Check-In: {formatDate(guest.check_in)}
            </p>
            <p className="text-gray-600">
              Check-Out: {formatDate(guest.check_out)}
            </p>
            <p className="text-gray-600">Amount: {guest.amount || "N/A"}</p>
            <p className="text-gray-600">
              Payment Date: {formatDate(guest.payment_date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
