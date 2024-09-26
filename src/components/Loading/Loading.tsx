import React from "react";
import styles from "./Loading.module.scss";

export const Loading = () => (
    <div className={styles.rollerContainer}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
