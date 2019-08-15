import React from 'react';
import TimeAgo from 'react-timeago';
import { IArticle } from 'graphql/types/article';
import styles from './ByLine.module.css';

export const ByLine = (props: IArticle) => {
  if (!props.publishedAt && !props.author) {
    return <></>;
  }
  return (
    <footer className={styles.ByLine}>
      {props.publishedAt && <TimeAgo date={props.publishedAt} />}
      {props.author && (
        <address>
          <a href={`/about/${props.author.toLowerCase()}`}>{props.author}</a>
        </address>
      )}
    </footer>
  );
};
