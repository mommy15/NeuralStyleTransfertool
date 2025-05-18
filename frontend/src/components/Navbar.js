import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Navbar component for the application
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Navbar Brand */}
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">NST Studio</Link>

        {/* Toggler for Mobile Devices */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* Login Link */}
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                style={{
                  transition: 'all 0.3s ease',
                  padding: '10px 15px',
                }}
              >
                Login
              </Link>
            </li>

            {/* Register Link */}
            <li className="nav-item">
              <Link
                to="/register"
                className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
                style={{
                  transition: 'all 0.3s ease',
                  padding: '10px 15px',
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
