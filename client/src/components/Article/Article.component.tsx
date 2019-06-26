import * as React from 'react';
import styles from './Article.module.css';

export interface ArticleProps {}

export const Article = (props: ArticleProps) => (
  <article className={styles.Article}></article>
);
