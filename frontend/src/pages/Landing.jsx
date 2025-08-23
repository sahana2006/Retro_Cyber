import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.retroHeader}>
        <h1 className={styles.glitch} data-text="⚡ Retro Cyber Auth ⚡">
          ⚡ Retro Cyber Auth ⚡
        </h1>
        <p>Secure your vault with 80s hacker vibes.</p>
      </div>

      <div className={styles.retroButtons}>
        <Link to="/login" className={styles.retroBtn}>
          Login
        </Link>
        <Link to="/register" className={styles.retroBtn}>
          Register
        </Link>
      </div>

      <footer className={styles.retroFooter}>
        <p>© 2025 Retro Cyber Auth | Built with Django + React</p>
      </footer>
    </div>
  );
};

export default LandingPage;
