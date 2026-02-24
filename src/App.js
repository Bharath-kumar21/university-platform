import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Universities from "./pages/Universities";
import UniversityDetails from "./pages/UniversityDetails";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { SavedProvider } from "./context/SavedContext";
import './App.css';

function App() {
  return (
    <SavedProvider>
      <Router basename="/university-platform">
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/university/:id" element={<UniversityDetails />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SavedProvider>
  );
}

export default App;
