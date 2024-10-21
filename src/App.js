// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/registerUser';
import Login from './components/login';
import NavBar from './components/navBar';
import BookList from './components/bookList';
import HomePage from './components/HomePage';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect( () => {
  const token = localStorage.getItem('token');
  if (token){
    setIsAuthenticated(true);
  }}, []);

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
