// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated = false;
        window.location.reload();
    }


    return (
        <nav className="navbar">
            <NavLink className="logo" to="/">
                Library System
            </NavLink>
            {!isAuthenticated ? (
                <ul className="nav-links">
                    <li>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                            Login
                        </NavLink>
                    </li>
                </ul>
            ) : (
                <ul className="nav-links">
                    <li>
                        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
                            Books
                        </NavLink>
                    </li>
                    <li>
                        <button className="btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
