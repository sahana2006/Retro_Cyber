// Login.jsx
import React, { useState } from "react";
import apiClient from "../api/apiClient";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await apiClient.post("/accounts/login/", formData);

    // Store only the access token
    localStorage.setItem("access_token", response.data.access);

    alert("Login successful!");
    navigate("/dashboard"); // or use navigate("/home") if using react-router
  } catch (error) {
    console.error("Login failed", error);
    alert("Invalid username or password");
  }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className={styles.retroBtn} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {success && <p className={styles.successMsg}>Login successful!</p>}
          {error && <p className={styles.errorMsg}>{error}</p>}
        </form>

        <p className={styles.altLink}>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
