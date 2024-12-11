import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Guests from './components/Guests';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    // Simple hardcoded login for demonstration
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Invalid password!');
    }
  };

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white container mx-auto">
        <Link to="/guests" className="mr-4">Guests</Link>
        <Link to="/admin">Admin Dashboard</Link>
        <button onClick={handleLogin} className="ml-4 bg-green-500 px-2 py-1 rounded">
          Admin Login
        </button>
      </nav>
      
      <Routes>
        <Route path="/guests" element={<Guests />} />
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/guests" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
