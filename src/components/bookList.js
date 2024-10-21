// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]); // Ensure it's an array initially

  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/books/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data); // Log the response to check its structure
        //   setBooks(response.data);
        // If the response is paginated and contains an array in a "results" field:
        setBooks(response.data.results);

      } catch (error) {
        setError('Failed to fetch books. Please check your connection or login.');
      }
    };


    fetchBooks();
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Available Books</h2>
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
      </ul>
    </div>
  );
};

export default BookList;
