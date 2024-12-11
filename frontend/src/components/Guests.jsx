import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddGuestForm = () => {
  const [guest, setGuest] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    room: '',
    checkInDate: '',
    checkOutDate: '',
    paymentMethod: '',
    paymentAmount: '',
  });
  const [rooms, setRooms] = useState([]);

  // Fetch available rooms from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevGuest) => ({
      ...prevGuest,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/guests', guest)
      .then((response) => {
        console.log('Guest added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding guest:', error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Add New Guest</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Personal Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={guest.name}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={guest.email}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={guest.phone}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={guest.address}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Room Selection */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Room Selection</h3>
          <select
            name="room"
            value={guest.room}
            onChange={handleChange}
            className="select select-bordered w-full mb-4"
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.room_number} - {room.type}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Details */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Booking Details</h3>
          <input
            type="date"
            name="checkInDate"
            value={guest.checkInDate}
            onChange={handleChange}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="date"
            name="checkOutDate"
            value={guest.checkOutDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Payment Details */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Payment Details</h3>
          <select
            name="paymentMethod"
            value={guest.paymentMethod}
            onChange={handleChange}
            className="select select-bordered w-full mb-4"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash</option>
          </select>
          <input
            type="number"
            name="paymentAmount"
            placeholder="Payment Amount"
            value={guest.paymentAmount}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-6">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddGuestForm;
