import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

const LogoutButton = ({ redirectTo = "/login" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session / tokens
    localStorage.removeItem("token"); // JWT or session token
    localStorage.removeItem("user"); // optional user info

    // Redirect to login or home
    navigate(redirectTo);
  };

  return (
    <button className={styles.neonButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
