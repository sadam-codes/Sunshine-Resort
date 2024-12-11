// App.js (Frontend)

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; 
import AddGuest from "./components/Guests"; 



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/guests" element={<Dashboard />} />
        <Route path="/add-guest" element={<AddGuest />} />

      </Routes>
    </Router>
  );
};

export default App;
