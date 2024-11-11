// src/components/HomePage.js
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './styling/HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const [isLibrarian, setIsLibrarian] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkUserRole();
    }
  }, [isAuthenticated]);


  const checkUserRole = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/', {
        headers: { Authorization: `Token ${token}` },
      });
      setIsLibrarian(response.data.is_staff || response.data.groups.includes('librarians'));
    } catch (error) {
      console.log("Error fetching user role:");
    }
  };

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
          {isLibrarian && <Link to="/addbooks" className="btn">Add Books</Link>}
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
