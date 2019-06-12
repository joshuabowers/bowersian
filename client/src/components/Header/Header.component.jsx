import React from 'react';
import styles from './Header.module.css';

const Header = ({ title, ...props }) => (
  <header className={styles.Header}>
    <h1>{title}</h1>
  </header>
);

export default Header;
