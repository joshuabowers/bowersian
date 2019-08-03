import * as React from 'react';
import styles from './Articles.module.css';

export interface IArticlesProps {}

export const Articles = (props: IArticlesProps) => (
  <main className={styles.Articles}>I'm a list of articles! w00t!</main>
);
