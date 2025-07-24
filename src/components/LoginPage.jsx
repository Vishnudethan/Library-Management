


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!person.email || !person.password) {
      setError("Both fields are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: person.email,
          password: person.password,
        }
      );

      console.log("✅ Login response:", response.data);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        navigate("/WebPage", {
          state: {
            person: response.data, 
          },
        });
      }, 2000);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
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
        position: "relative",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        {/* Back button left aligned */}
        <div className="mb-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        {/* Heading centered */}
        <h3 className="text-center mb-4">Member Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={person.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Your password"
              value={person.password}
              onChange={handleChange}
            />
          </div>

          {/* Alerts */}
          {error && (
            <div className="alert alert-danger py-1">{error}</div>
          )}
          {success && (
            <div className="alert alert-success py-1">{success}</div>
          )}

          {/* Spinner */}
          {loading && (
            <div className="text-center mb-2">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don&apos;t have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/RegisterPage")}
            >
              Register here
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


