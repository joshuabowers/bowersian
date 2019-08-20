// NOTE: This is for the Articles grid.
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { ByLine } from 'components/ByLine';
import { IArticle } from 'graphql/types/article';
import styles from './Synopsis.module.css';

export const Synopsis = (props: IArticle) => {
  const uri = props.uri || `/edit/${props.id}`;
  const check = ['material-icons', styles.check].join(' ');
  return (
    <article className={styles.Synopsis}>
      <Link to={uri}>
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
