import React, { useState } from "react";
import styles from "../styles/Register.module.css"; // Import as styles
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/accounts/register/", formData);
      console.log("✅ Registration successful:", response.data);
      alert("User registered successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      if (error.response) {
        console.error("❌ Registration failed:", error.response.data);
        alert("Registration failed: " + JSON.stringify(error.response.data));
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2 className={styles.heading}>🔐 Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.retroBtn}>
            Register
          </button>
        </form>

        <p className={styles.altLink}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
