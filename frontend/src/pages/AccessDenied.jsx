import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AccessDenied.module.css";
import LogoutButton from "../components/LogoutButton";

function AccessDenied() {
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

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>🚫 ACCESS DENIED 🚫</h1> */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}> 🚫 ACCESS DENIED 🚫 </h1>
        <div className={styles.logoutWrapper}>
          <LogoutButton redirectTo="/login" />
        </div>
      </div>
      <div className={styles.cardGrid}>
        {/* Card 1 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Clue 1</h2>
          <p className={styles.cardText}>
            Numbers can whisper letters:{" "}
            <span className={styles.code}>74 72 75 65</span>.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Clue 2</h2>
          <p className={styles.cardText}>
            This road is a <span className={styles.false}>lie</span>. Seek the
            path that speaks <span className={styles.true}>truth</span>.
          </p>
        </div>
      </div>

      <button className={styles.button} onClick={handleBack}>
        🔙 RETURN TO BASE
      </button>
      <div className={styles.glowRing} />
    </div>
  );
}

export default AccessDenied;
