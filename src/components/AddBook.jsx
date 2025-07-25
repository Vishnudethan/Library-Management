
/*import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddBook() {
  const location = useLocation();
  const navigate = useNavigate();

  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: "",
  });

  useEffect(() => {
    if (location.state && location.state.bookList) {
      setBookList(location.state.bookList);
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const validateFields = () => {
    if (!newBook.title || newBook.title.length > 100) {
      return "Title is required and must be under 100 characters.";
    }
    if (!newBook.author || newBook.author.length > 50) {
      return "Author is required and must be under 50 characters.";
    }
    if (!newBook.publicationDate) {
      return "Publication Date is required.";
    }
    if (!/^\d{13}$/.test(newBook.isbn)) {
      return "ISBN must be exactly 13 digits.";
    }
    if (!newBook.genre) {
      return "Please select a Genre.";
    }
    const ratingNum = Number(newBook.rating);
    if (!newBook.rating || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return "Rating must be a number between 1 and 5.";
    }
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const duplicate = bookList.find((book) => book.isbn === newBook.isbn);
    if (duplicate) {
      setErrorMessage("A book with this ISBN already exists.");
      return;
    }

    setBookList([...bookList, newBook]);
    setErrorMessage("✅ Book added successfully!");
    // Reset form
    setNewBook({
      title: "",
      author: "",
      publicationDate: "",
      isbn: "",
      genre: "",
      rating: "",
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://im.whatshot.in/img/2019/Apr/book-fair-og-1554289398.jpg?wm=1&w=1200&h=630&cc=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
    <div
      style={{
        width: "400px",
        padding: "20px",
        margin: "40px auto",
        
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            maxLength="100"
            placeholder="Book title"
            value={newBook.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            maxLength="50"
            placeholder="Author name"
            value={newBook.author}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Publication Date:</label>
          <input
            type="date"
            name="publicationDate"
            value={newBook.publicationDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label>ISBN (13 digits):</label>
          <input
            type="text"
            name="isbn"
            placeholder="e.g., 9781234567890"
            value={newBook.isbn}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Genre:</label>
          <select
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Select Genre</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Mystery</option>
            <option>Fantasy</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Others</option>
          </select>
        </div>

        <div style={inputGroupStyle}>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            placeholder="1-5"
            value={newBook.rating}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {errorMessage && (
          <div style={{ color: errorMessage.startsWith("✅") ? "green" : "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" style={buttonStylePrimary}>Add Book</button>
          <button
            type="button"
            style={buttonStyleSecondary}
            onClick={() => navigate("/WebPage", { state: { bookList } })}
          >
            Back to Library
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

// Styles
const inputGroupStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
  fontSize: "14px",
};

const buttonStylePrimary = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

const buttonStyleSecondary = {
  padding: "10px 20px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

export default AddBook;*/
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const location = useLocation();
  const navigate = useNavigate();

  const person = location.state?.person;

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const validateFields = () => {
    if (!newBook.title || newBook.title.length > 100) {
      return "Title is required and must be under 100 characters.";
    }
    if (!newBook.author || newBook.author.length > 50) {
      return "Author is required and must be under 50 characters.";
    }
    if (!newBook.publicationDate) {
      return "Publication Date is required.";
    }
    if (!/^\d{13}$/.test(newBook.isbn)) {
      return "ISBN must be exactly 13 digits.";
    }
    if (!newBook.genre) {
      return "Please select a Genre.";
    }
    const ratingNum = Number(newBook.rating);
    if (!newBook.rating || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return "Rating must be a number between 1 and 5.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:8080/books", {
        ...newBook,
        ownerEmail: person.email, // 👈 Link book to user
      });
      setErrorMessage("✅ Book added successfully!");
      setNewBook({ title: "", author: "", publicationDate: "", isbn: "", genre: "", rating: "" });
    } catch (err) {
      console.error(err);
      setErrorMessage("❌ Error adding book.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://im.whatshot.in/img/2019/Apr/book-fair-og-1554289398.jpg?wm=1&w=1200&h=630&cc=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div style={{
        width: "400px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          {/* Fields same as before */}
          <div style={inputGroupStyle}><label>Title:</label>
            <input type="text" name="title" value={newBook.title} onChange={handleChange} style={inputStyle} required /></div>
          <div style={inputGroupStyle}><label>Author:</label>
            <input type="text" name="author" value={newBook.author} onChange={handleChange} style={inputStyle} required /></div>
          <div style={inputGroupStyle}><label>Publication Date:</label>
            <input type="date" name="publicationDate" value={newBook.publicationDate} onChange={handleChange} style={inputStyle} required /></div>
          <div style={inputGroupStyle}><label>ISBN:</label>
            <input type="text" name="isbn" value={newBook.isbn} onChange={handleChange} style={inputStyle} required /></div>
          <div style={inputGroupStyle}><label>Genre:</label>
            <select name="genre" value={newBook.genre} onChange={handleChange} style={inputStyle} required>
              <option value="">Select Genre</option>
              <option>Fiction</option><option>Non-Fiction</option><option>Mystery</option><option>Fantasy</option><option>Romance</option><option>Sci-Fi</option><option>Others</option>
            </select></div>
          <div style={inputGroupStyle}><label>Rating (1-5):</label>
            <input type="number" name="rating" value={newBook.rating} onChange={handleChange} style={inputStyle} required /></div>
          {errorMessage && (<div style={{ color: errorMessage.startsWith("✅") ? "green" : "red", marginBottom: "10px" }}>{errorMessage}</div>)}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit" style={buttonStylePrimary}>Add Book</button>
            <button type="button" style={buttonStyleSecondary}
              onClick={() => navigate("/WebPage", { state: { person } })}>Back to Library</button></div>
        </form>
      </div>
    </div>
  );
}

const inputGroupStyle = { marginBottom: "15px" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px", fontSize: "14px" };
const buttonStylePrimary = { padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" };
const buttonStyleSecondary = { padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" };

export default AddBook;


