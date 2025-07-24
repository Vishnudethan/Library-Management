
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [person, setPerson] = useState({
    PersonName: "",
    PersonEmail: "",
    PersonPassword: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // ✅ Client-side validation
    if (!person.PersonName || !person.PersonEmail || !person.PersonPassword) {
      setError("All fields are mandatory.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (person.PersonPassword.length < 3) {
      setError("Password must be at least 3 characters.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      // ✅ Send data to Spring Boot backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/register", // Update if your backend is deployed elsewhere
        {
          personName: person.PersonName,
          email: person.PersonEmail,
          password: person.PersonPassword,
        }
      );

      console.log("✅ Server response:", response.data);

      // ✅ Show success message & auto redirect
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        setSuccess("");
        setIsRegistered(true);
      }, 2000);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError("Registration failed. Please try again or check for errors.");
      }
      setTimeout(() => setError(""), 2000);
    }
  };

  // ✅ Redirect to login if registration is done
  useEffect(() => {
    if (isRegistered) {
      navigate("/loginPage");
    }
  }, [isRegistered, navigate]);

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
      {/* ✅ Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
       <div className="mb-2">
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => navigate("/")}
    >
      ← Back
    </button>
  </div>
        <h3 className="mb-0 text-center flex-grow-1">Create Your Account</h3>
    
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name:</label>
            <input
              type="text"
              id="name"
              name="PersonName"
              className="form-control"
              placeholder="Your name"
              value={person.PersonName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              name="PersonEmail"
              className="form-control"
              placeholder="you@example.com"
              value={person.PersonEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="PersonPassword"
              className="form-control"
              placeholder="Min 3 characters"
              minLength={3}
              value={person.PersonPassword}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Error Alert */}
          {error && (
            <div className="alert alert-danger py-1">{error}</div>
          )}

          {/* ✅ Success Alert */}
          {success && (
            <div className="alert alert-success py-1">{success}</div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-2">
            Register Now
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/LoginPage")}
            >
              Log in here
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

