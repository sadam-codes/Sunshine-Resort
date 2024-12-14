import React, { useState } from "react";
import axios from "axios";

const AddGuestForm = ({ onGuestAdded }) => {
  const [formData, setFormData] = useState({
    guest_name: "",
    email: "",
    phone: "",
    address: "",
    room_number: "",
    room_type: "",
    check_in: "",
    check_out: "",
    amount: "",
    payment_date: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/guests", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure this is set
        },
      });
      alert("Guest added successfully!");
      onGuestAdded(); // Refresh the guest list
      setFormData({
        guest_name: "",
        email: "",
        phone: "",
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
      className="p-6 bg-white border border-gray-300"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Add New Guest</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="guest_name"
          placeholder="Guest Name"
          value={formData.guest_name}
          onChange={handleChange}
          required
          className="border p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="room_number"
          placeholder="Room Number"
          value={formData.room_number}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="room_type"
          placeholder="Room Type"
          value={formData.room_type}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="date"
          name="check_in"
          value={formData.check_in}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="date"
          name="check_out"
          value={formData.check_out}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          required
          className="border p-2"
        />
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
        Add Guest
      </button>
    </form>
  );
};

export default AddGuestForm;
