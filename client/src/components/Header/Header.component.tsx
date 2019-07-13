import React from 'react';
import GemButton from 'components/GemButton';
import styles from './Header.module.css';

export interface HeaderProps {
  /** The text to display within the header */
  title: string;
}

export const Header = (props: HeaderProps) => (
  <header className={styles.Header}>
    <h1>{props.title}</h1>
    <ul>
      <li>
        <GemButton from="add" to="save" />
      </li>
      <li>
        <GemButton from="lock" to="lock_open" />
      </li>
    </ul>
  </header>
);
