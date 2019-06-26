import * as React from 'react';
import styles from './Articles.module.css';

export interface ArticlesProps {
  /** The set of articles to render. Should have their preview flag set. */
  children: React.ReactNode; // TODO: Likely change this to Article.
}

export const Articles = (props: ArticlesProps) => (
  <section className={styles.Articles}>{props.children}</section>
);
