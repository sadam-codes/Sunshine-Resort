import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const GuestsPage = () => {
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState(null);
  const [editingGuest, setEditingGuest] = useState(null); // Guest being edited
  const [editForm, setEditForm] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Address: "",
    CNIC: "",
  });

  // Fetch guest data on component mount
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/guests");
      setGuests(response.data);
    } catch (err) {
      toast.error("Failed to fetch guests data"); // Display error toast if fetching fails
    }
  };

  // Handle delete action
  const handleDelete = async (GuestID) => {
    try {
      await axios.delete(`http://localhost:5000/api/guests/${GuestID}`);
      setGuests(guests.filter((guest) => guest.GuestID !== GuestID)); // Filter out the deleted guest
      toast.success("Guest deleted successfully!"); // Display success toast on successful deletion
    } catch (err) {
      toast.error("Failed to delete guest"); // Display error toast if deletion fails
    }
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/guests/${editingGuest.GuestID}`, // Ensure the ID is correctly used here
        editForm
      );
      setGuests(
        guests.map((guest) =>
          guest.GuestID === editingGuest.GuestID ? { ...guest, ...editForm } : guest
        )
      );
      setEditingGuest(null);
      toast.success('Guest updated successfully!'); // Display success toast on successful update
    } catch (err) {
      toast.error("Failed to update guest"); // Display error toast if update fails
    }
  };

  // Start editing a guest
  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setEditForm(guest);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guest List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Guest Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Guest ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">CNIC</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.GuestID}>
              <td className="border border-gray-300 px-4 py-2">{guest.GuestID}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.FirstName}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.LastName}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.Phone}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.Email}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.CNIC}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(guest)}
                  className="bg-black text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guest.GuestID)}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingGuest && (
        <div className="border border-gray-300 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Edit Guest</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={editForm.FirstName}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={editForm.LastName}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="Phone"
              placeholder="Phone"
              value={editForm.Phone}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={editForm.Email}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={editForm.Address}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="CNIC"
              placeholder="CNIC"
              value={editForm.CNIC}
              onChange={handleEditChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Update Guest
            </button>
            <button
              type="button"
              onClick={() => setEditingGuest(null)}
              className="bg-black text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default GuestsPage;
