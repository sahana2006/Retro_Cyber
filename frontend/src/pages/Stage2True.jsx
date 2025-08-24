import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Stage2True.module.css";

function Stage2True() {
  return (
    <div className={styles.container}>
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
