
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

// Basic Book Details Component
const BasicDetails = ({ book }) => (
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
);

// Book Image Component
const BookImage = ({ imageLinks, title }) => (
  imageLinks?.thumbnail ? (
    <img
      src={imageLinks.thumbnail.replace("zoom=1", "zoom=2")}
      alt={`Cover of ${title}`}
      style={{
        width: "100%",
        maxWidth: "300px",
        borderRadius: "8px",
      }}
    />
  ) : <p>No cover image available.</p>
);

// Google Book Details Component
const MoreDetails = ({ googleBook }) => (
  <Row>
    <Col md={4} style={{ textAlign: "center", marginTop: "20px" }}>
      <BookImage imageLinks={googleBook?.imageLinks} title={googleBook?.title} />
    </Col>
    <Col md={8} style={{ marginTop: "20px" }}>
      <p><strong>Description:</strong></p>
      <p>{googleBook?.description || "No description available."}</p>
      <p><strong>Publisher:</strong> {googleBook?.publisher || "N/A"}</p>
      <p><strong>Page Count:</strong> {googleBook?.pageCount || "N/A"}</p>
      <p><strong>Language:</strong> {googleBook?.language || "N/A"}</p>
    </Col>
  </Row>
);

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [googleBook, setGoogleBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedBook = location.state?.book;

    if (selectedBook) {
      setBook(selectedBook);

      const queryParam = selectedBook.isbn?.trim() && !selectedBook.isbn.includes(" ")
        ? `isbn=${selectedBook.isbn}`
        : `title=${encodeURIComponent(selectedBook.title)}`;

      //axios.get(`http://localhost:8080/api/books/google?${queryParam}`)
      axios.get(`https://library-management-jf5a.onrender.com/api/books/google?${queryParam}`)
  .then((response) => {
    const data = response.data; // ✅ No need for JSON.parse

    if (data.items?.length > 0) {
      setGoogleBook(data.items[0].volumeInfo);
    } else {
      console.log("No books found from Google Books for:", queryParam);
    }
  })
  .catch((error) => console.error("Backend proxy API error:", error))
  .finally(() => setLoading(false));

    } else {
      navigate("/WebPage");
    }
  }, [location.state, navigate]);

  if (!book) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Book not found. Redirecting...</p>;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url('https://im.whatshot.in/img/2019/Apr/book-fair-og-1554289398.jpg?wm=1&w=1200&h=630&cc=1')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Container
        fluid
        style={{
          padding: "50px",
          maxWidth: "1000px",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Title: {book.title}
        </h2>

        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="basic"
            id="book-details-tabs"
            className="mb-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <Tab eventKey="basic" title="Basic Details">
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  padding: "15px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <BasicDetails book={book} />
              </div>
            </Tab>

            <Tab eventKey="more" title="More Details">
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  padding: "15px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                {googleBook ? (
                  <MoreDetails googleBook={googleBook} />
                ) : (
                  <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
                    No additional details found from Google Books.
                  </p>
                )}
              </div>
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
            onClick={() => navigate("/WebPage")}
          >
            Back to Book List
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BookDetails;




