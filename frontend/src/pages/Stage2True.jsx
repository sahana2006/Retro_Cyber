import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Stage2True.module.css";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function Stage2True() {
  const navigate = useNavigate();
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token"); // JWT token
      if (!token) {
        navigate("/login");
        return;
      }
      // If token exists verify it with the backend
      try {
        await apiClient.get("/accounts/check-auth/", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        navigate("/login"); // Not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.logoutWrapper}>
        <LogoutButton redirectTo="/login" />
      </div>
      <h1 className={styles.title}>STAGE 2 COMPLETED</h1>

      <div className={styles.card}>
        <p className={styles.lead}>
          You flipped the switch to <span className={styles.true}>TRUE</span>.
          Nice hack!
        </p>
        <p className={styles.sub}>
          The gateway hums with neon light. Proceed when ready…
        </p>

        <Link to="/stage-3" className={styles.button}>
          ENTER FINAL ROUND →
        </Link>
      </div>

      <div className={styles.glowRing} />
    </div>
  );
}

export default Stage2True;
