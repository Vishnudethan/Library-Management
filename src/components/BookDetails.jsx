
/*import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [googleBook, setGoogleBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const person = location.state?.person;

  useEffect(() => {
    if (location.state && location.state.book) {
      const selectedBook = location.state.book;
      setBook(selectedBook);
      


      // Use ISBN or Title for external lookup
      const query = selectedBook.isbn?.trim() && !selectedBook.isbn.includes(" ") 
        ? `isbn:${selectedBook.isbn}`
        : `intitle:${encodeURIComponent(selectedBook.title)}`;
      console.log("Google Books API query:", query);
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((response) => {
          console.log("Google Books API response:", response.data);
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
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Book not found. Redirecting...</p>;
  }

  return (
    
    <Container fluid style={{ padding: "50px", maxWidth: "1000px" }}>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}> Title:{book.title}</h2>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Tabs defaultActiveKey="basic" id="book-details-tabs" className="mb-3">
          <Tab eventKey="basic" title="Basic Details">
            <Row>
              <Col md={12} style={{ marginTop: "20px" }}>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Rating:</strong> {book.rating}</p>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="more" title="More Details">
            <Row>
              <Col md={4} style={{ textAlign: "center", marginTop: "20px" }}>
                {googleBook?.imageLinks?.thumbnail ? (
                  <img
                    src={googleBook.imageLinks.thumbnail.replace("zoom=1", "zoom=2")}
                    alt="Book Cover"
                    style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
                  />
                ) : (
                  <p>No cover image available.</p>
                )}
              </Col>
              <Col md={8} style={{ marginTop: "20px" }}>
                <p><strong>Description:</strong></p>
                <p>{googleBook?.description || "No description available."}</p>
                <p><strong>Publisher:</strong> {googleBook?.publisher || "N/A"}</p>
                <p><strong>Page Count:</strong> {googleBook?.pageCount || "N/A"}</p>
                <p><strong>Language:</strong> {googleBook?.language || "N/A"}</p>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      )}

      <div style={{ textAlign: "center" }}>
        <button
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/WebPage", { state: { person } })}
        >
          Back to Book List
        </button>
      </div>
    </Container>
  );
};

export default BookDetails;*/
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [googleBook, setGoogleBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const person = location.state?.person;

  useEffect(() => {
    if (location.state && location.state.book) {
      const selectedBook = location.state.book;
      setBook(selectedBook);

      // Build the query params for backend proxy call
      const queryParam = selectedBook.isbn?.trim() && !selectedBook.isbn.includes(" ")
        ? `isbn=${selectedBook.isbn}`
        : `title=${encodeURIComponent(selectedBook.title)}`;

      axios
        .get(`http://localhost:8080/books/google?${queryParam}`)
        .then((response) => {
          // Try parsing if backend returns plain text JSON
          let data;
          if (typeof response.data === "string") {
            data = JSON.parse(response.data);
          } else {
            data = response.data;
          }
          console.log("Proxied Google Books API response:", data);

          if (data.items && data.items.length > 0) {
            setGoogleBook(data.items[0].volumeInfo);
          }
        })
        .catch((error) => console.error("Backend proxy API error:", error))
        .finally(() => setLoading(false));
    } else {
      navigate("/WebPage");
    }
  }, [location.state, navigate]);

  if (!book) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Book not found. Redirecting...
      </p>
    );
  }

  return (
    <Container fluid style={{ padding: "50px", maxWidth: "1000px" }}>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>
        Title: {book.title}
      </h2>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Tabs defaultActiveKey="basic" id="book-details-tabs" className="mb-3">
          <Tab eventKey="basic" title="Basic Details">
            <Row>
              <Col md={12} style={{ marginTop: "20px" }}>
                <p>
                  <strong>Title:</strong> {book.title}
                </p>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Publication Date:</strong> {book.publicationDate}
                </p>
                <p>
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p>
                  <strong>Rating:</strong> {book.rating}
                </p>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="more" title="More Details">
            <Row>
              <Col md={4} style={{ textAlign: "center", marginTop: "20px" }}>
                {googleBook?.imageLinks?.thumbnail ? (
                  <img
                    src={googleBook.imageLinks.thumbnail.replace(
                      "zoom=1",
                      "zoom=2"
                    )}
                    alt="Book Cover"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <p>No cover image available.</p>
                )}
              </Col>
              <Col md={8} style={{ marginTop: "20px" }}>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>{googleBook?.description || "No description available."}</p>
                <p>
                  <strong>Publisher:</strong>{" "}
                  {googleBook?.publisher || "N/A"}
                </p>
                <p>
                  <strong>Page Count:</strong>{" "}
                  {googleBook?.pageCount || "N/A"}
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {googleBook?.language || "N/A"}
                </p>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      )}

      <div style={{ textAlign: "center" }}>
        <button
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/WebPage", { state: { person } })}
        >
          Back to Book List
        </button>
      </div>
    </Container>
  );
};

export default BookDetails;


