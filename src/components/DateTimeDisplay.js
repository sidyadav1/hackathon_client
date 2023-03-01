import React from "react";
import styles from "./Timer.module.css";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={`${styles.countdown}`}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
