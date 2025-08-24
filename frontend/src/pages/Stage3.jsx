import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if using react-router
import styles from "../styles/Stage3.module.css";
import LogoutButton from "../components/LogoutButton";

const Stage3 = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access"); // JWT token
      if (!token) {
        navigate("/login");
        return;
      }
      // If token exists verify it with the backend
      try {
        await axios.get("http://localhost:8000/api/check-auth/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false); // Authenticated, show dashboard
      } catch (err) {
        navigate("/login"); // Not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  const buttons = [
    {
      id: 1,
      icon: "bi-sun",
      text: "Morning's brilliance naturally comes after night",
    },
    { id: 2, icon: "bi-water", text: "Wandering waters carve paths unseen" },
    {
      id: 3,
      icon: "bi-moon",
      text: "Night's first whisper awakens the silent watcher",
    },
    {
      id: 4,
      icon: "bi-leaf",
      text: "Ancient trees murmur secrets in the wind",
    }, // decoy
    {
      id: 5,
      icon: "bi-stars",
      text: "Glimmers flicker in the sky's quiet corners",
    },
    { id: 6, icon: "bi-fire", text: "Fires leap where caution is forgotten" }, // decoy
  ];

  const correctSequence = [3, 1, 5, 2]; // correct sequence

  const [userSequence, setUserSequence] = useState([]);
  const [keyResult, setKeyResult] = useState(null);

  const handleClick = (id) => {
    if (userSequence.includes(id)) return; // prevent double click

    const newSequence = [...userSequence, id];
    setUserSequence(newSequence);

    if (newSequence.length === 4) {
      const isCorrect = newSequence.every(
        (val, index) => val === correctSequence[index]
      );

      setKeyResult(
        isCorrect
          ? "🎉 Secret Key: SHADOW-2025 🎉" // new key name
          : "❌ Wrong sequence! Try again. ❌"
      );
    }
  };

  const handleReset = () => {
    setUserSequence([]);
    setKeyResult(null);
  };

  const handleExit = () => {
    navigate("/"); // go to home page
  };

  return (
    <div className={styles.stage3Container}>
      <div className={styles.headerContainer}>
        <div className={styles.textBlock}>
          <h2>LAST-LEVEL-SECRET</h2>
          <p className={styles.riddle}>
            Start your journey by choosing the 4 buttons in the right order.
          </p>
        </div>
        <div className={styles.logoutWrapper}>
          <LogoutButton redirectTo="/login" />
        </div>
      </div>

      <div className={styles.buttonsGrid}>
        {buttons.map((btn) => (
          <button
            key={btn.id}
            className={`${styles.mazeButton} ${
              userSequence.includes(btn.id) ? styles.selectedButton : ""
            }`}
            onClick={() => handleClick(btn.id)}
          >
            <i className={`bi ${btn.icon} ${styles.icon}`}></i>
            <span className={styles.text}>{btn.text}</span>
          </button>
        ))}
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
        {keyResult && (
          <button
            className={styles.resetButton}
            onClick={handleExit}
            style={{ marginLeft: "1rem" }}
          >
            Exit to Home
          </button>
        )}
      </div>

      {keyResult && <div className={styles.keyResult}>{keyResult}</div>}
    </div>
  );
};

export default Stage3;
