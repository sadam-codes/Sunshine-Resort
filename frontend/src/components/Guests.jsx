import { useState, useEffect } from 'react';
import axios from 'axios';

function Guests() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/guests');
      setGuests(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const addGuest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/guests', newGuest);
      fetchGuests();
      setNewGuest({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Guest Management</h1>
      
      <form onSubmit={addGuest} className="bg-gray-100 p-6 rounded-md shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={newGuest.name} 
            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={newGuest.email} 
            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
          <input 
            type="text" 
            placeholder="Phone" 
            value={newGuest.phone} 
            onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
          <input 
            type="text" 
            placeholder="Address" 
            value={newGuest.address} 
            onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
          Add Guest
        </button>
      </form>

      <ul className="space-y-4">
        {guests.map(guest => (
          <li key={guest.guest_id} className="p-4 bg-white shadow rounded-md">
            <p className="font-semibold text-lg">{guest.name}</p>
            <p className="text-gray-500">{guest.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Guests;
