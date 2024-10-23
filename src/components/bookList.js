// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]); // Ensure it's an array initially
  const [searched_book, setSearchedBook] = useState([]); // Ensure it's an array initially
  const [searchQuery, setSearchQuery] = useState(''); // To store search input
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    fetchBookAll(); // Initial fetch without search parameters
  }, [navigate]);

  const fetchBooks = async (search) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/my-books/?search=${search}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSearchedBook(response.data.results);
    } catch (error) {
      setError('Failed to fetch books. Please check your connection or login.');
    }
  };

  const fetchBookAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/books/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setBooks(response.data.results);
    } catch (error) {
      setError('Failed to fetch books. Please check your connection or login.');
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Fetch books based on the search query
    if (searchQuery === '') {
      fetchBookAll();
    }
    else {
      fetchBooks(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchBookAll(); // Fetch all books again
    setSearchedBook([]);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Available Books</h2>

      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by title, author or description"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
        <button type="button" className="clear-button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {searched_book.length === 0 || flag === true ? (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Published Date:</strong> {book.published_date}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
            </li>
          ))}
        </ul>)
        :
        (<ul className="book-list">
          {searched_book.map((book) => (
            <li key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Published Date:</strong> {book.published_date}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
            </li>
          ))}
        </ul>
        )}
    </div>
  );
};

export default BookList;
