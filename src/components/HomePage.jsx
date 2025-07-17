import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            LibraryMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate("/LoginPage")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate("/RegisterPage")}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Hero section */}
      <div className="position-relative" style={{ marginTop: "56px" }}>
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          className="d-block w-100"
          alt="Library"
          style={{ height: "90vh", objectFit: "cover" }}
        />
        <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
           
            <h1
  className="display-4 text-white fw-bold"
  style={{
    position: "fixed",
    top: "70px", 
    left: "50%",
    transform: "translateX(-50%)",
  
    backgroundColor: "rgba(209, 142, 142, 0.6)",
    padding: "1rem 2rem",
    borderRadius: "8px",
  }}
>
  Welcome to the Library Management System
</h1>
            <p className="lead text-white">
             Effortlessly manage books, view details, and keep your library organized.
            </p>
            <button
              className="btn btn-outline-light mt-3"
              onClick={() => navigate("/RegisterPage")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* ✅ About Section */}
      <section className="py-5 bg-light" id="about">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
        <p className="text-center w-75 mx-auto">
  Welcome to LibraryMS — your one-stop digital solution for managing your book collection with ease. 
  Effortlessly add new books with detailed information like title, author, publication date, ISBN, genre, and rating — all with robust validation to keep your records clean and accurate. 
  Browse your entire collection in a dynamic, sortable table with intuitive pagination for large lists, and easily remove books you no longer need. 
  Dive deeper into each book’s details with our dedicated Book Details Page, featuring neatly organized tabs and enriched information from trusted sources like Google Books. 
  LibraryMS keeps your library up-to-date, organized, and accessible — making book management simpler and more efficient than ever.
</p>

        </div>
      </section>

      {/* ✅ Extra Carousel */}
      <div id="extraCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://im.whatshot.in/img/2019/Apr/book-fair-og-1554289398.jpg?wm=1&w=1200&h=630&cc=1"
              className="d-block w-100"
              alt="Library Interior"
              style={{ height: "80vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1547126298-f0ae8a42c489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              className="d-block w-100"
              alt="Reading Area"
              style={{ height: "80vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://miro.medium.com/max/10944/1*S81O15rjKfG-BFdnNC6-GQ.jpeg"
              className="d-block w-100"
              alt="Bookshelf"
              style={{ height: "80vh", objectFit: "cover" }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#extraCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#extraCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* ✅ Contact Section */}
      <section className="bg-dark text-white py-5" id="contact">
        <div className="container text-center">
          <h2 className="mb-3">Contact Us</h2>
          <p>
            📍 Main Library Road, Trivandrum | ☎️ +91-9876543210 | 📧 support@libraryms.com
          </p>
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => navigate("/RegisterPage")}
          >
            Register Now
          </button>
          <button
            className="btn btn-outline-light mt-3 ms-2"
            onClick={() => navigate("/LoginPage")}
          >
            Member Login
          </button>
          
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-black text-white text-center py-3">
        <small>&copy; 2025 LibraryMS. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default HomePage;
