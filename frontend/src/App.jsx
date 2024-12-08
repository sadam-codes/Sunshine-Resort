import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage/Home";
import GuestsPage from "./pages/GuestsPage/GuestsPage";
import AddGuestPage from "./pages/GuestsPage/AddGuestPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/add-guest" element={<AddGuestPage />} />
      </Routes>
    </Router>
  );
};

export default App;
