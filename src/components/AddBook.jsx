
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    isbn: "",
    genre: "",
    rating: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    if (!newBook.title || newBook.title.length > 100)
      return "Title is required and must be under 100 characters.";
    if (!newBook.author || newBook.author.length > 50)
      return "Author is required and must be under 50 characters.";
    if (!newBook.publicationDate)
      return "Publication Date is required.";
    if (!/^\d{13}$/.test(newBook.isbn))
      return "ISBN must be exactly 13 digits.";
    if (!newBook.genre)
      return "Please select a Genre.";
    const rating = Number(newBook.rating);
    if (isNaN(rating) || rating < 1 || rating > 5)
      return "Rating must be a number between 1 and 5.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateFields();
    if (error) {
      setMessage({ text: error, color: "red" });
      return;
    }

    try {
      //await axios.post("http://localhost:8080/api/books", newBook);
      await axios.post("https://library-management-jf5a.onrender.com/api/books", newBook);
      setMessage({ text: "✅ Book added successfully!", color: "green" });
      setNewBook({ title: "", author: "", publicationDate: "", isbn: "", genre: "", rating: "" });
    } catch (err) {
      console.error("Error adding book:", err);
      setMessage({ text: "❌ Failed to add book.", color: "red" });
    }
  };
return (
  <div
    className="d-flex justify-content-center align-items-center min-vh-100"
    style={{
      backgroundImage:
        "url('https://im.whatshot.in/img/2019/Apr/book-fair-og-1554289398.jpg?wm=1&w=1200&h=630&cc=1')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label>Title:</label>
          <input name="title" value={newBook.title} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Author:</label>
          <input name="author" value={newBook.author} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Publication Date:</label>
          <input type="date" name="publicationDate" value={newBook.publicationDate} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>ISBN:</label>
          <input name="isbn" value={newBook.isbn} onChange={handleChange} style={inputStyle} required />
        </div>
        <div style={inputGroupStyle}>
          <label>Genre:</label>
          <select name="genre" value={newBook.genre} onChange={handleChange} style={inputStyle} required>
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
          <input type="number" name="rating" value={newBook.rating} onChange={handleChange} style={inputStyle} required />
        </div>

        {message && (
          <div style={{ color: message.color, marginBottom: "10px" }}>{message.text}</div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" style={buttonStylePrimary}>Add Book</button>
          <button type="button" style={buttonStyleSecondary} onClick={() => navigate("/WebPage")}>Back to Library</button>
        </div>
      </form>
    </div>
  </div>
);

  
}
const formContainerStyle = {
  width: "90%",
  maxWidth: "400px",
  padding: "25px",
  backgroundColor: "#ffffffee", // semi-transparent white
  borderRadius: "10px",
  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
};

const inputGroupStyle = { marginBottom: "15px" };
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

export default AddBook;




