import React from "react";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles["loaderContainer"]}>
    <div className={styles["spinner"]}>
      <div className={styles["double-bounce1"]} />
      <div className={styles["double-bounce2"]} />
    </div>
    </div>
  );
};

export default Loader;
