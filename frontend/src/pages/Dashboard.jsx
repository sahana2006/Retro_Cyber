import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import apiClient from "../api/apiClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false); // whether first unlock is done
  const [stage, setStage] = useState(0); // 0 = grid locked, 1 = one unlocked
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await apiClient.get("/accounts/check-auth/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User is authenticated");
        setLoading(false);
      } catch (err) {
        console.log("User is not authenticated", err.response?.data);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setUnlocked(true); // unlock one card
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>
          <i className="bi bi-lock-fill"></i> Escape Dashboard
        </h1>
        <div className={styles.logoutWrapper}>
          <LogoutButton redirectTo="/login" />
        </div>
      </div>

      {stage === 0 && (
        <div className={styles.grid}>
          {/* Card 1 becomes unlocked after Ctrl+L */}
          <div
            className={`${styles.card} ${unlocked ? styles.unlocked : ""}`}
            onClick={() => unlocked && setStage(1)}
          >
            <i className={`bi ${unlocked ? "bi-unlock" : "bi-lock"}`}></i>
            <span className={styles.hint}>
              {unlocked
                ? "Click me to get the key 🔑"
                : "Inspect what lies beneath the surface"}
            </span>
          </div>

          <div className={styles.card}>
            <i className="bi bi-lock"></i>
            <span className={styles.hint}>Look beyond the visible UI</span>
          </div>

          <div className={styles.card}>
            <i className="bi bi-lock"></i>
            <span className={styles.hint}>Look deeper, maybe in source</span>
          </div>

          <div className={styles.card}>
            <i className="bi bi-lock"></i>
            <span className={styles.hint}>What's hidden can whisper</span>
          </div>
        </div>
      )}

      {/* Stage 1 → Next level unlocked */}
      {stage === 1 && (
        <div
          className={styles.popupCard}
          onClick={() => {
            // send user to wrong/fake stage first
            navigate("/stage-2-false");
          }}
        >
          <i className="bi bi-brightness-high"></i>
          <p>You found the key! 🔑 Unlocking Stage 2...</p>
          <small>(Click to proceed...)</small>
          <div className={styles.glowRing} />
        </div>
      )}

      {/* Hidden hint */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- Q1RSTCArIEwgdG8gdW5sb2NrIHRoZSBrZXkhISEh -->`,
        }}
      />
    </div>
  );
};

export default Dashboard;
