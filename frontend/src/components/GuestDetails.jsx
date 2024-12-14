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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guest Details</h1>
      
      <AddGuestForm onGuestAdded={fetchGuests} />
      
      <table className="min-w-full bg-white border border-gray-300 mt-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Room Number</th>
            <th className="py-2 px-4 border">Room Type</th>
            <th className="py-2 px-4 border">Check-In</th>
            <th className="py-2 px-4 border">Check-Out</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="py-2 px-4 border">{guest.id}</td>
              <td className="py-2 px-4 border">{guest.guest_name}</td>
              <td className="py-2 px-4 border">{guest.email}</td>
              <td className="py-2 px-4 border">{guest.phone}</td>
              <td className="py-2 px-4 border">{guest.address}</td>
              <td className="py-2 px-4 border">{guest.room_number}</td>
              <td className="py-2 px-4 border">{guest.room_type}</td>
              <td className="py-2 px-4 border">{guest.check_in}</td>
              <td className="py-2 px-4 border">{guest.check_out}</td>
              <td className="py-2 px-4 border">{guest.amount}</td>
              <td className="py-2 px-4 border">{guest.payment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
