import React from "react";
import styles from "./Header.module.css";
import Navbar from "./UI/Navbar";

const Header = () => {
  return (
    <div className={styles.header}>
      <Navbar />
    </div>
  );
};

export default Header;
