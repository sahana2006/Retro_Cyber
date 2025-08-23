import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  const [unlocked, setUnlocked] = useState(false); // whether first unlock is done
  const [stage, setStage] = useState(0); // 0 = grid locked, 1 = one unlocked

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
      <h1 className={styles.title}>
        <i className="bi bi-lock-fill"></i> Escape Dashboard
      </h1>

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
                : "The answer isn't always dark"}
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
        <div className={styles.popupCard} onClick={() => setStage(2)}>
          <i className="bi bi-brightness-high"></i>
          <p>You found the key! 🔑 Unlocking Stage 2...</p>
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
