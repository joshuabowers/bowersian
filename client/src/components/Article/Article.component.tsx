import * as React from 'react';
import TimeAgo from 'react-timeago';
import styles from './Article.module.css';
import { Link } from 'react-router-dom';
import { Article as IArticle } from 'store/resources/types';
import { useSelector } from 'react-redux';

export interface ArticleProps {
  /** The title of the article */
  title: string;
  /** Whether the article is being displayed in preview mode or full */
  preview?: boolean;
  /** Used in preview mode to give an impression of the article's contents */
  synopsis?: string;
  /** The body of the article. Should be in markdown. */
  content?: string;
  /** The date when the article was published. */
  publishedAt?: string | Date;
  /** The user who wrote/published this article. */
  author?: string;
}

export interface IArticleProps {
  preview: boolean;
}

export type TArticle = IArticle & IArticleProps;

export interface ArticleFooterProps {
  /** The date when the article was published. */
  publishedAt?: string | Date;
  /** The user who wrote/published this article. */
  author?: string;
}

export const ArticleFooter = (props: ArticleFooterProps) => {
  if (!props.publishedAt && !props.author) {
    return <></>;
  }
  return (
    <footer>
      {props.publishedAt && <TimeAgo date={props.publishedAt} />}
      {props.author && (
        <address>
          <a href={`/about/${props.author.toLowerCase()}`}>{props.author}</a>
        </address>
      )}
    </footer>
  );
};

function linkinate(
  isPreview: boolean | undefined,
  destination: string,
  component: JSX.Element
) {
  console.log(destination);
  return isPreview ? <Link to={destination}>{component}</Link> : component;
}

export const Article = (props: TArticle) => {
  // if (props.preview && !props.synopsis) {
  //   throw new Error('A synopsis is required when in preview mode.');
  // } else if (!props.preview && !props.content) {
  //   throw new Error('Content is required if in full mode.');
  // }
  // const source: TArticle = props.preview ? props : useSelector()
  const content = (
    <>
      <header>
        <h2>{props.title}</h2>
      </header>
      {props.preview ? (
        <blockquote>{props.summary}</blockquote>
      ) : (
        <section>{props.body}</section>
      )}
      {ArticleFooter(props)}
    </>
  );
  return (
    <article className={styles.Article}>
      {linkinate(props.preview, props.uri, content)}
    </article>
  );
};
