import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [guests, setGuests] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [roomServices, setRoomServices] = useState([]);
  const [staff, setStaff] = useState([]);
  
  const [currentData, setCurrentData] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = () => {
    axios.get("http://localhost:5000/api/guests")
      .then((response) => setGuests(response.data))
      .catch((error) => console.error("Error fetching guests:", error));

    axios.get("http://localhost:5000/api/roomtypes")
      .then((response) => setRoomTypes(response.data))
      .catch((error) => console.error("Error fetching room types:", error));

    axios.get("http://localhost:5000/api/rooms")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));

    axios.get("http://localhost:5000/api/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));

    axios.get("http://localhost:5000/api/extraservices")
      .then((response) => setExtraServices(response.data))
      .catch((error) => console.error("Error fetching extra services:", error));

    axios.get("http://localhost:5000/api/payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));

    axios.get("http://localhost:5000/api/roomservices")
      .then((response) => setRoomServices(response.data))
      .catch((error) => console.error("Error fetching room services:", error));

    axios.get("http://localhost:5000/api/staff")
      .then((response) => setStaff(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  };

    // Handle delete operation
    const deleteData = (section, id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this?");
      if (confirmDelete) {
        axios.delete(`http://localhost:5000/api/${section.toLowerCase()}/${id}`)
          .then(() => {
            // Update frontend after deletion
            if (section === "guests") {
              setGuests(prevGuests => prevGuests.filter(item => item.id !== id));
            } else if (section === "rooms") {
              setRooms(prevRooms => prevRooms.filter(item => item.id !== id));
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    };
  
    // Handle edit operation (open input fields with current data)
    const editData = (section, item) => {
      setCurrentData(item);
      setEditing(true);
    };
  
    // Handle updating data
    const updateData = (section) => {
      axios.put(`http://localhost:5000/api/${section.toLowerCase()}/${currentData.id}`, currentData)
        .then(() => {
          fetchData(); // Refresh data after update
          setEditing(false); // Close the edit form
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Sunshine Resort
      </h1>

      {/* Guests Table */}
      <TableSection title="Guests" data={guests} editData={editData} deleteData={deleteData} />

      {/* Room Types Table */}
      <TableSection title="Room Types" data={roomTypes} editData={editData} deleteData={deleteData} />

      {/* Rooms Table */}
      <TableSection title="Rooms" data={rooms} editData={editData} deleteData={deleteData} />

      {/* Bookings Table */}
      <TableSection title="Bookings" data={bookings} editData={editData} deleteData={deleteData} />

      {/* Extra Services Table */}
      <TableSection title="Extra Services" data={extraServices} editData={editData} deleteData={deleteData} />

      {/* Payments Table */}
      <TableSection title="Payments" data={payments} editData={editData} deleteData={deleteData} />

      {/* Room Services Table */}
      <TableSection title="Room Services" data={roomServices} editData={editData} deleteData={deleteData} />

      {/* Staff Table */}
      <TableSection title="Staff" data={staff} editData={editData} deleteData={deleteData} />

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit {currentData?.name}</h2>
            {/* Render form based on the data structure */}
            <input
              type="text"
              value={currentData.name}
              onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button onClick={() => updateData('guests')} className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const TableSection = ({ title, data, editData, deleteData }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <section className="mb-12 mx-auto container">
      <h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-black">
          <thead className="bg-black text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="border border-black px-4 py-2">
                  {col.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </th>
              ))}
              <th className="border border-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="border border-black px-4 py-2">
                      {item[col]}
                    </td>
                  ))}
                  <td className="border border-black px-4 py-2">
                    <button
                      onClick={() => editData(title, item)}
                      className="bg-black text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteData(title, item.id)}
                      className="bg-black text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="border border-black px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default App;
