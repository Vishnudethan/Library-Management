import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import axios from "axios";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [googleBook, setGoogleBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.book) {
      const selectedBook = location.state.book;
      setBook(selectedBook);

      // Call Google Books API to fetch more details by ISBN or title
      const query = selectedBook.isbn || selectedBook.title;

      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((response) => {
          if (response.data.items && response.data.items.length > 0) {
            setGoogleBook(response.data.items[0].volumeInfo);
          }
        })
        .catch((error) => console.error("Google Books API error:", error))
        .finally(() => setLoading(false));
    } else {
      navigate("/WebPage");
    }
  }, [location.state, navigate]);

  if (!book) {
    return <p>Book not found. Redirecting...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>{book.title}</h2>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Tabs defaultActiveKey="basic" id="book-details-tabs">
          <Tab eventKey="basic" title="Basic Details">
            <div style={{ marginTop: "20px" }}>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Publication Date:</strong> {book.publicationDate}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Rating:</strong> {book.rating}</p>
            </div>
          </Tab>

          <Tab eventKey="more" title="More Details">
            <div style={{ marginTop: "20px" }}>
              {googleBook?.imageLinks?.thumbnail && (
                <img
                  src={googleBook.imageLinks.thumbnail}
                  alt="Book Cover"
                  style={{ marginBottom: "20px" }}
                />
              )}
              <p><strong>Description:</strong></p>
              <p>{googleBook?.description || "No description available."}</p>
              <p><strong>Publisher:</strong> {googleBook?.publisher}</p>
              <p><strong>Page Count:</strong> {googleBook?.pageCount}</p>
              <p><strong>Language:</strong> {googleBook?.language}</p>
            </div>
          </Tab>
        </Tabs>
      )}

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/WebPage")}
      >
        Back to Book List
      </button>
    </div>
  );
};

export default BookDetails;
