import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [guests, setGuests] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [roomServices, setRoomServices] = useState([]);
  const [extraServices, setExtraServices] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/guests').then(response => setGuests(response.data));
    axios.get('http://localhost:5000/api/roomtypes').then(response => setRoomTypes(response.data));
    axios.get('http://localhost:5000/api/rooms').then(response => setRooms(response.data));
    axios.get('http://localhost:5000/api/bookings').then(response => setBookings(response.data));
    axios.get('http://localhost:5000/api/payments').then(response => setPayments(response.data));
    axios.get('http://localhost:5000/api/staff').then(response => setStaff(response.data));
    axios.get('http://localhost:5000/api/roomservices').then(response => setRoomServices(response.data));
    axios.get('http://localhost:5000/api/extraservices').then(response => setExtraServices(response.data));
  }, []);

  return (
    <div>
      <h1>Hotel Management System</h1>

      <section>
        <h2>Guests</h2>
        <table>
          <thead>
            <tr>
              <th>Guest ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(guest => (
              <tr key={guest.GuestID}>
                <td>{guest.GuestID}</td>
                <td>{guest.FirstName}</td>
                <td>{guest.LastName}</td>
                <td>{guest.Email}</td>
                <td>{guest.Phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Room Types</h2>
        <table>
          <thead>
            <tr>
              <th>Room Type ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map(roomType => (
              <tr key={roomType.RoomTypeID}>
                <td>{roomType.RoomTypeID}</td>
                <td>{roomType.RoomTypeName}</td>
                <td>{roomType.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Rooms</h2>
        <table>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Room Number</th>
              <th>Rent Per Day</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.RoomID}>
                <td>{room.RoomID}</td>
                <td>{room.RoomNumber}</td>
                <td>{room.RentPerDay}</td>
                <td>{room.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Similarly, create sections for Bookings, Payments, Staff, Room Services, Extra Services */}
    </div>
  );
}

export default App;
