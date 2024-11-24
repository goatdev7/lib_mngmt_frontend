// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styling/bookList.css';


export const BookList = () => {
  const [books, setBooks] = useState([]); // Ensure it's an array initially
  const [error, setError] = useState('');

  const [searched_book, setSearchedBook] = useState([]); // Ensure it's an array initially
  const [searchQuery, setSearchQuery] = useState(''); // To store search input
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    // Initial fetch without search parameters
    // fetchBookAll(); 
    fetchBooks(''); 
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

  // const fetchBookAll = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get(`http://127.0.0.1:8000/api/books/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setBooks(response.data.results);
  //   } catch (error) {
  //     setError('Failed to fetch books. Please check your connection or login.');
  //   }
  // };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;

    setSearchQuery(query);
    if (query === ''){
      fetchBooks('');
    }
    // // Uncomment the else block if API calls need to be restrained
    // // This is an alternative to search submit mechanism
    // else{
    //   fetchBooks(query);
    // }
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Fetch books based on the search query
    fetchBooks(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchBooks('');
    // fetchBookAll(); // Fetch all books again
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



export const AddBook = () => {
  const [books, setBooks] = useState([]); // Ensure it's an array initially
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [addBook, setAddBook] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    pub_date: "",
  });

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login'); 
      return;
    }

  }, [navigate]);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddBook({ ...addBook, [name]: name === 'pub_date' ? formatDate(value) : value });
  };


  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/books/',
        JSON.stringify(addBook),
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update books state with the new book entry
      setBooks([...books, response.data]);
      setAddBook({ title: '', author: '', description: '', isbn: '', pub_date: '' });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setError(error.response.data);
      } else {
        setError('Failed to add book. Please check your input or login status.');
      }
    }
  };

  return (
    <div className="book-list-container">
      {/* Add Book Form */}

      < form className="add-book-form" onSubmit={handleAddBook} >
        <h3>Add a New Book</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={addBook.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={addBook.author}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={addBook.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="pub_date"
          placeholder="Published Date"
          value={addBook.published_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={addBook.isbn}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="add-button">Add Book</button>
      </form >
    </div>
  )

};