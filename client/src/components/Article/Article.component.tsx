import * as React from 'react';
import styles from './Article.module.css';

export interface ArticleProps {
  /** The title of the article */
  title: string;
  /** Whether the article is being displayed in preview mode or full */
  preview?: boolean;
  /** Used in preview mode to give an impression of the article's contents */
  synopsis?: string;
  /** The body of the article. Should be in markdown. */
  content?: string;
}

export const Article = (props: ArticleProps) => {
  if (props.preview && !props.synopsis) {
    throw new Error('A synopsis is required when in preview mode.');
  } else if (!props.preview && !props.content) {
    throw new Error('Content is required if in full mode.');
  }
  return (
    <article className={styles.Article}>
      {props.preview ? props.synopsis : props.content}
    </article>
  );
};
