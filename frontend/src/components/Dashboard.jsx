import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/guests").then((response) => {
      setGuests(response.data);
    });

    axios.get("http://localhost:5000/api/rooms").then((response) => {
      setRooms(response.data);
    });

    axios.get("http://localhost:5000/api/bookings").then((response) => {
      setBookings(response.data);
    });

    axios.get("http://localhost:5000/api/payments").then((response) => {
      setPayments(response.data);
    });
  }, []);

  const handleGuestClick = (guestId) => {
    const guest = guests.find((g) => g.guest_id === guestId);
    const guestBooking = bookings.filter((b) => b.guest_id === guestId);
    const guestPayments = payments.filter(
      (p) => p.booking_id === guestBooking[0]?.booking_id
    );

    setSelectedGuest({
      ...guest,
      room: rooms.find((r) => r.room_id === guestBooking[0]?.room_id),
      booking: guestBooking[0],
      payments: guestPayments,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(); // Format the date in local string
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Hotel Management Dashboard
      </h1>

      {/* Display Guests */}
      <h2 className="text-2xl font-semibold mb-4">Guests</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guests.map((guest) => (
          <div
            key={guest.guest_id}
            className="card bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-medium text-gray-800">{guest.name}</h3>
            <p className="text-sm text-gray-600">{guest.email}</p>
            <p className="text-sm text-gray-600">{guest.phone}</p>
            <p className="text-sm text-gray-600">{guest.address}</p>
            <button
              className="bg-black text-white rounded-md p-2 my-2"
              onClick={() => handleGuestClick(guest.guest_id)}
            >
              More Details
            </button>
          </div>
        ))}
      </div>

      {/* Display Selected Guest Details */}
      {selectedGuest && (
        <div className="card bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedGuest.name}'s Details
          </h2>

          {/* Personal Details Card */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Personal Details
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {selectedGuest.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {selectedGuest.phone}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Address:</strong> {selectedGuest.address}
            </p>
          </div>

          {/* Room Details Card */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Room Details
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Room Number:</strong> {selectedGuest.room?.room_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Room Type:</strong> {selectedGuest.room?.type}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price:</strong> {selectedGuest.room?.price}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {selectedGuest.room?.status}
            </p>
          </div>

          {/* Booking Details Card */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Booking Details
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Booking ID:</strong> {selectedGuest.booking?.booking_id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Check-in Date:</strong>{" "}
              {formatDate(selectedGuest.booking?.check_in_date)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Check-out Date:</strong>{" "}
              {formatDate(selectedGuest.booking?.check_out_date)}
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="payment-details">
            <h3>Payments</h3>
            {selectedGuest.payments?.map((payment) => (
              <div key={payment.payment_id}>
                <p className="text-sm text-gray-600">
                  <strong>Payment ID:</strong> {payment.payment_id}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Amount:</strong> {payment.amount}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Date:</strong>{" "}
                  {formatDate(payment.payment_date)}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Method:</strong> {payment.payment_method}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
