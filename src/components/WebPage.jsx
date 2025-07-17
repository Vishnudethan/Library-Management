import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Webpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [person, setPerson] = useState();
  const [bookList, setBookList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const booksPerPage = 10;

  useEffect(() => {
    if (location.state) {
      if (location.state.bookList) {
        setBookList(location.state.bookList);
      }
      if (location.state.person) {
        setPerson(location.state.person);
      }
    } else {
      setError(true);
    }
  }, [location.state]);

  // Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...bookList].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setBookList(sorted);
    setSortField(field);
    setSortOrder(order);
  };

  // Delete Book with Spring Boot
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      setBookList(bookList.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Pagination
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = bookList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookList.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {error ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ color: "red", fontSize: "2rem" }}>Error!!!</h1>
          <p style={{ fontSize: "1.2rem" }}>
            You tried to enter the library without logging in.
            Please go back and log in.
          </p>
          <button onClick={() => navigate("/HomePage")} style={buttonStyle}>
            Go to Home
          </button>
        </div>
      ) : (
        <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "30px" }}>
            Hi {person?.PersonName || "User"}, Welcome to the Online Library
          </h2>

          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={headerStyle}>Sl.No</th>
                <th style={headerStyle} onClick={() => handleSort("title")}>Title</th>
                <th style={headerStyle} onClick={() => handleSort("author")}>Author</th>
                <th style={headerStyle} onClick={() => handleSort("publicationDate")}>Publication Date</th>
                <th style={headerStyle} onClick={() => handleSort("isbn")}>ISBN</th>
                <th style={headerStyle} onClick={() => handleSort("genre")}>Genre</th>
                <th style={headerStyle} onClick={() => handleSort("rating")}>Rating</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, index) => (
                <tr key={book.id || index} style={tableRowStyle}>
                  <td style={tableCellStyle}>{indexOfFirst + index + 1}</td>
                  <td
  style={{ ...tableCellStyle, cursor: "pointer", color: "#2980b9", textDecoration: "underline" }}
  onClick={() => navigate("/BookDetails", { state: { book } })}
>
  {book.title}
</td>

                  <td style={tableCellStyle}>{book.author}</td>
                  <td style={tableCellStyle}>{book.publicationDate}</td>
                  <td style={tableCellStyle}>{book.isbn}</td>
                  <td style={tableCellStyle}>{book.genre}</td>
                  <td style={tableCellStyle}>{book.rating}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  style={{
                    margin: "0 5px",
                    padding: "6px 12px",
                    backgroundColor: currentPage === idx + 1 ? "#2980b9" : "#ddd",
                    color: currentPage === idx + 1 ? "white" : "black",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => paginate(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              style={actionButtonStyle}
              onClick={() => navigate("/AddBook", { state: { bookList } })}
            >
              Add Book
            </button>
            <button
              style={logoutButtonStyle}
              onClick={() => navigate("/LoginPage")}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  border: "1px solid #ddd",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const headerStyle = {
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#2980b9",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
};

const tableRowStyle = {
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "12px",
  fontSize: "1rem",
  textAlign: "left",
};

const deleteButtonStyle = {
  padding: "6px 10px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const actionButtonStyle = {
  padding: "12px 20px",
  marginRight: "10px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

const logoutButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default Webpage;
