import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Article from 'components/Article';
import styles from './Articles.module.css';

export const Articles = () => {
  const articles = useSelector((state: AppState) => state.articles);
  return (
    <main className={styles.Articles}>
      {articles.map(article => (
        <Article key={article.id} {...article} preview />
      ))}
    </main>
  );
};
