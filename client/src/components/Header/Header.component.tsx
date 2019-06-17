import React from 'react';
import styles from './Header.module.css';

export interface HeaderProps {
  /** The text to display within the header */
  title: string;
}

export const Header = (props: HeaderProps) => (
  <header className={styles.Header}>
    <h1>{props.title}</h1>
  </header>
);
