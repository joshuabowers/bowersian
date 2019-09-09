// NOTE: This is for the Articles grid.
import React from 'react';
import { Link } from 'react-router-dom';
import { ByLine } from 'components/ByLine';
import { IArticle } from 'graphql/types/article';
import styles from './Synopsis.module.css';

export const Synopsis = (props: IArticle) => {
  const uri = props.uri || `/edit/${props.id}`;
  const check = ['material-icons', styles.check].join(' ');
  return (
    <article className={styles.Synopsis}>
      <Link
        to={uri}
        onClick={e => {
          // e.preventDefault();
          // const computed = window.getComputedStyle(e.target as Element);
          // const position = (e.target as Element).getBoundingClientRect();
          // const { left, top, width, height } = computed;
          // console.info({ left, top, width, height });
          // console.info( position );
        }}
      >
        <header>
          <h2>
            {props.title}
            <span className={check}>check</span>
          </h2>
        </header>
        <blockquote>{props.summary}</blockquote>
        <ByLine {...props} />
      </Link>
    </article>
  );
};
