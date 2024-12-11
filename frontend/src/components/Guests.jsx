import { useState, useEffect } from "react";
import axios from "axios";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/guests");
      setGuests(response.data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  const addGuest = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/guests", newGuest);
      fetchGuests();
      setNewGuest({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Guest Management</h1>

      {/* Guest Form */}
      <form
        onSubmit={addGuest}
        className="bg-gray-100 p-6 rounded-md shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newGuest.name}
            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newGuest.email}
            onChange={(e) =>
              setNewGuest({ ...newGuest, email: e.target.value })
            }
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newGuest.phone}
            onChange={(e) =>
              setNewGuest({ ...newGuest, phone: e.target.value })
            }
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={newGuest.address}
            onChange={(e) =>
              setNewGuest({ ...newGuest, address: e.target.value })
            }
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600 transition"
        >
          Add Guest
        </button>
      </form>

      {/* Guests List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.map((guest) => (
          <div
            key={guest.guest_id}
            className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{guest.name}</h3>
            <p className="text-gray-500 mb-2">
              <strong>Email:</strong> {guest.email}
            </p>
            <p className="text-gray-500 mb-2">
              <strong>Phone:</strong> {guest.phone}
            </p>
            <p className="text-gray-500">
              <strong>Address:</strong> {guest.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guests;
