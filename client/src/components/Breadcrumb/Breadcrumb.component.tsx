import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

export interface IBreadcrumbProps {
  children: JSX.Element[];
}

export const Breadcrumb = (props: IBreadcrumbProps) => {
  const items = [
    <Link to="/" className="material-icons">
      home
    </Link>,
    ...props.children
  ];

  return (
    <nav className={styles.Breadcrumb}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </nav>
  );
};
