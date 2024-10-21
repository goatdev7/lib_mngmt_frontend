// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is logged in

  return (
    <div className="homepage-container">
      <h1>Welcome to the Library Management System</h1>
      <p>Manage your library and keep track of your books efficiently.</p>

      {!isAuthenticated ? (
        <div className="auth-buttons">
          <Link to="/register" className="btn">Register</Link>
          <Link to="/login" className="btn">Login</Link>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/books" className="btn">View Books</Link>
          <button
            className="btn"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload(); // Refresh to reflect logout
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
