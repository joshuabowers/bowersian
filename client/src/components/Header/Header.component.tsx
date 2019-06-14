import React from 'react';
import styles from './Header.module.css';

export interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => (
  <header className={styles.Header}>
    <h1>{props.title}</h1>
  </header>
);

export default Header;
