import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Webpage = () => {
    const location = useLocation();
    const [error, setError] = useState(false);
    const [person, setPerson] = useState();
    const navigate = useNavigate();

    const [bookList, setBookList] = useState([
        {
            id: 1,
            image: "https://lumiere-a.akamaihd.net/v1/images/cars_dochudson_characterimage_829445c8.jpeg?region=0,0,600,600&width=320",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 500,
            coverType: "Typographic",
            edition: "50th Anniversary Edition",
            genre: "Fiction",
            quantity: 10,
            year: 1960,
        },
        {
            id: 2,
            image: "https://lumiere-a.akamaihd.net/v1/images/mater_characterimage_b6ea14ea.jpeg?region=0,0,600,600&width=320",
            title: "1984",
            author: "George Orwell",
            price: 1000,
            coverType: "Retro",
            edition: "Signet Classics Edition",
            genre: "fiction",
            quantity: 15,
            year: 1949,
        },
        {
            id: 3,
            image: "https://lumiere-a.akamaihd.net/v1/images/sally_characterimage_a07777b2.jpeg?region=0,0,600,600&width=320",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 300,
            coverType: "Scene Setting",
            edition: "Penguin Classics Edition",
            genre: "Classic",
            quantity: 8,
            year: 1925,
        },
        {
            id: 4,
            image: "https://lumiere-a.akamaihd.net/v1/images/cars_guido_characterimage_d07d6ff8.jpeg?region=0,0,600,600&width=320",
            title: "The Harry Potter",
            author: "J.K. Rowling",
            price: 800,
            coverType: "Portrait",
            edition: "Seven Fantasy",
            genre: "Thriller-Fiction",
            quantity: 8,
            year: 1995,
        },
    ]);

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

    return (
        <div>
            {error ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h1 style={{ color: "red", fontSize: "2rem" }}>Error!!!</h1>
                    <p style={{ fontSize: "1.2rem" }}>
                        This error has occurred because you tried to enter the library without registering.
                        Please go back and register to avail the facility.
                    </p>
                    <button
                        onClick={() => navigate("/home")}
                        style={{
                            padding: "12px 20px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                            fontSize: "1rem",
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            ) : (
                <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "30px" }}>
                        Hi {person?.PersonName}, Welcome to the Online Library
                    </h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f4f4f4" }}>
                                <th style={headerStyle}>Sl.No</th>
                                <th style={headerStyle}>Image</th>
                                <th style={headerStyle}>Title</th>
                                <th style={headerStyle}>Author</th>
                                <th style={headerStyle}>Price (₹)</th>
                                <th style={headerStyle}>Cover Type</th>
                                <th style={headerStyle}>Edition</th>
                                <th style={headerStyle}>Genre</th>
                                <th style={headerStyle}>Quantity</th>
                                <th style={headerStyle}>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) => (
                                <tr key={book.id} style={tableRowStyle}>
                                    <td style={tableCellStyle}>{index + 1}</td>
                                    <td style={tableCellStyle}>
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            style={{ width: "50px", height: "75px", borderRadius: "4px" }}
                                        />
                                    </td>
                                    <td style={tableCellStyle}>{book.title}</td>
                                    <td style={tableCellStyle}>{book.author}</td>
                                    <td style={tableCellStyle}>{book.price}</td>
                                    <td style={tableCellStyle}>{book.coverType}</td>
                                    <td style={tableCellStyle}>{book.edition}</td>
                                    <td style={tableCellStyle}>{book.genre}</td>
                                    <td style={tableCellStyle}>{book.quantity}</td>
                                    <td style={tableCellStyle}>{book.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <button
                            style={actionButtonStyle}
                            onClick={() => navigate("/add", { state: { bookList } })}
                        >
                            Add Book
                        </button>
                        <button
                            style={actionButtonStyle}
                            onClick={() => navigate("/view", { state: { bookList } })}
                        >
                            View Books
                        </button>
                        <button
                            style={logoutButtonStyle}
                            onClick={() => navigate("/log")}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const headerStyle = {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#2980b9",
    color: "white",
    fontSize: "1rem",
};

const tableRowStyle = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s",
};

const tableCellStyle = {
    padding: "12px",
    fontSize: "1rem",
    textAlign: "left",
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
    transition: "background-color 0.3s",
};

const logoutButtonStyle = {
    padding: "12px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
};

export default Webpage;