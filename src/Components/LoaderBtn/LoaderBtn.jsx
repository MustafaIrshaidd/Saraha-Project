import React from "react";
import styles from "./styles.module.css";

const LoaderBtn = () => {
  return (
    <div className={styles["sk-chase"]}>
      <div className={styles["sk-chase-dot"]}/>
      <div className={styles["sk-chase-dot"]} />
      <div className={styles["sk-chase-dot"]}/>
      <div className={styles["sk-chase-dot"]} />
      <div className={styles["sk-chase-dot"]} />
      <div className={styles["sk-chase-dot"]}/>
    </div>
  );
};

export default LoaderBtn;
