import React, { useState } from "react";
import axios from "axios";

const AddGuestForm = ({ onGuestAdded }) => {
  const [formData, setFormData] = useState({
    guest_name: "",
    email: "",
    phone: "",
    id_card: "",
    address: "",
    room_number: "",
    room_type: "",
    check_in: "",
    check_out: "",
    amount: "",
    payment_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request with the form data
      await axios.post("http://localhost:5000/api/guests", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Guest added successfully!");
      onGuestAdded(); // Refresh the guest list
      setFormData({
        guest_name: "",
        email: "",
        phone: "",
        id_card: "",
        address: "",
        room_number: "",
        room_type: "",
        check_in: "",
        check_out: "",
        amount: "",
        payment_date: "",
      });
    } catch (err) {
      console.error("Error adding guest:", err);
      alert("Error adding guest.");
    }
  };

  return (
    <form
      className="mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Guest</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <input
          type="text"
          name="guest_name"
          placeholder="Guest Name"
          value={formData.guest_name}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="id_card"
          placeholder="ID Card"
          value={formData.id_card}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="room_number"
          placeholder="Room Number"
          value={formData.room_number}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="room_type"
          placeholder="Room Type"
          value={formData.room_type}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="check_in"
          placeholder="Check in date"
          value={formData.check_in}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="check_out"
          placeholder="Check out date"
          value={formData.check_out}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto bg-black text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Guest
      </button>
    </form>
  );
};

export default AddGuestForm;
