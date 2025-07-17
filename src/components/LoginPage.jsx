/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [person, setPerson] = useState({
    PersonEmail: "",
    PersonPassword: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!person.PersonEmail || !person.PersonPassword) {
      setError("Both fields are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      // ✅ POST to backend login endpoint
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: person.PersonEmail,
          password: person.PersonPassword,
        }
      );

      console.log("✅ Login response:", response.data);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        setIsLoggedIn(true);
      }, 2000);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/web", {
        state: {
          person: { email: person.PersonEmail },
        },
      });
    }
  }, [isLoggedIn, navigate, person.PersonEmail]);

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
       //✅ Overlay 
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
        <h3 className="text-center mb-4">Member Login</h3>

        <form onSubmit={handleSubmit}>
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
              placeholder="Your password"
              value={person.PersonPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-1">{error}</div>
          )}

          {success && (
            <div className="alert alert-success py-1">{success}</div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Log In
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don&apos;t have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Spinner state

  const [person, setPerson] = useState({
    PersonEmail: "",
    PersonPassword: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!person.PersonEmail || !person.PersonPassword) {
      setError("Both fields are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true); // ✅ Start spinner

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: person.PersonEmail,
          password: person.PersonPassword,
        }
      );

      console.log("✅ Login response:", response.data);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        setIsLoggedIn(true);
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
      setLoading(false); // ✅ Stop spinner
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/web", {
        state: {
          person: { email: person.PersonEmail },
        },
      });
    }
  }, [isLoggedIn, navigate, person.PersonEmail]);

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
         {/* Back button: left aligned */}
  <div className="mb-2">
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => navigate("/")}
    >
      ← Back
    </button>
  </div>

  {/* Heading: centered */}
  <h3 className="text-center mb-4">Member Login</h3>

        <form onSubmit={handleSubmit}>
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
              placeholder="Your password"
              value={person.PersonPassword}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Alerts */}
          {error && (
            <div className="alert alert-danger py-1">{error}</div>
          )}
          {success && (
            <div className="alert alert-success py-1">{success}</div>
          )}

          {/* ✅ Spinner */}
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
            disabled={loading} // ✅ Disable while loading
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

