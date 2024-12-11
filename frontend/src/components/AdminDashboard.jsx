import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({
    availableRooms: 0,
    guestsLastWeek: 0,
    guestsLastMonth: 0,
    totalGuests: 0,
    totalRooms: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-blue-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Available Rooms</h2>
          <p className="text-4xl font-bold">{stats.availableRooms}</p>
        </div>

        <div className="bg-green-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Guests Last Week</h2>
          <p className="text-4xl font-bold">{stats.guestsLastWeek}</p>
        </div>

        <div className="bg-yellow-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Guests Last Month</h2>
          <p className="text-4xl font-bold">{stats.totalGuests}</p>
        </div>

        <div className="bg-purple-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Total Guests</h2>
          <p className="text-4xl font-bold">{stats.totalGuests}</p>
        </div>

        <div className="bg-red-200 p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Total Rooms</h2>
          <p className="text-4xl font-bold">{stats.totalRooms}</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;