import React from "react";
import avatar from "../assets/avatar.png";
import styles from '../components/TopPlayers.module.css'
const TopPlayers = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.second}>
          <img src={avatar} width="35%"></img>
          <div className={styles.name}>Name</div>
          <div className={styles.score}>Score</div>
        </div>
        <div className={styles.first}>
          <img src={avatar} width="30%"></img>
          <div className={styles.name}>Name</div>
          <div className={styles.score}>Score</div>
        </div>
        <div className={styles.third}>
          <img src={avatar} width="20%"></img>
          <div className={styles.name}>Name</div>
          <div className={styles.score}>Score</div>
        </div>
      </div>
    </>
  );
};
export default TopPlayers;
