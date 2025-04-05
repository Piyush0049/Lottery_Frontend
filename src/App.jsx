// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./components/webProvider";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
};

export default App;
