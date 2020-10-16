import React from "react";
import { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
  <footer className={styles.footer}>
    <p className={styles.title}>Junnna World</p>
  </footer>
));

export default Footer;
