

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Pagination, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WebPage = () => {
  const [books, setBooks] = useState([]);
  const [sortField, setSortField] = useState(""); // no sort initially
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;//for pagination
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      //const res = await axios.get("http://localhost:8080/api/books");
      const res = await axios.get("http://library-managementbe.onrender.com/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
  try {
   // await axios.delete(`http://localhost:8080/api/books/${id}`);
   await axios.delete(`http://library-managementbe.onrender.com/api/books/${id}`);
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);

    // Calculate new total pages
    const updatedTotalPages = Math.ceil(updatedBooks.length / booksPerPage);

    // If current page exceeds new total pages, shift back a page
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
  } catch (err) {
    console.error("Error deleting book:", err);
  }
};

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (!sortField) return 0; // No sorting by default
    const fieldA = a[sortField]?.toString().toLowerCase() ?? "";
    const fieldB = b[sortField]?.toString().toLowerCase() ?? "";
    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <Container fluid style={{ minHeight: "100vh", padding: "30px" }}>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Button variant="secondary" onClick={() => navigate("/")}>
            ← Home
          </Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => navigate("/AddBook")}>Add Book</Button>
        </Col>
      </Row>

      <h2 className="mb-4 text-center">Book List</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortField === "title" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("author")} style={{ cursor: "pointer" }}>
              Author {sortField === "author" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("genre")} style={{ cursor: "pointer" }}>
              Genre {sortField === "genre" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Publication Date</th>
            <th>ISBN</th>
            <th onClick={() => handleSort("rating")} style={{ cursor: "pointer" }}>
              Rating {sortField === "rating" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{indexOfFirst + index + 1}</td>
              <td
                onClick={() => navigate("/BookDetails", { state: { book } })}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {book.title}
              </td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publicationDate}</td>
              <td>{book.isbn}</td>
              <td>{book.rating}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center mt-3">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default WebPage;



