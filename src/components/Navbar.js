import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="flex-center logo" style={{ gap: "0.5rem", color: "#000" }}>
          <div className="logo-icon bg-black"></div>
          <span>UniSearch India</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/universities" className={`nav-link ${location.pathname === '/universities' ? 'active' : ''}`}>Universities</Link>
          <Link to="/compare" className={`nav-link ${location.pathname === '/compare' ? 'active' : ''}`}>Compare</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Analytics</Link>
        </div>

        <div className="nav-actions">
          <div className="nav-search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search universities..." className="nav-search" />
          </div>
          <Link to="/login" className="btn-text" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/signup" className="btn-black" style={{ textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
