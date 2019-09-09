import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styles from './Articles.module.css';
import { IArticles } from 'graphql/types/article';

import { RouteComponentProps } from 'react-router-dom';
import { Synopsis } from 'components/Synopsis';

export const searchArticles = gql`
  query SearchArticles($filter: IArticleFilter) {
    articles(filter: $filter) {
      id
      title
      summary
      tags
      slug
      uri
      publishedAt
    }
  }
`;

export interface ArticlesProps {
  year?: any;
  month?: any;
}

export const Articles = (props: ArticlesProps & RouteComponentProps) => {
  const date = props.year && {
    year: parseInt(props.year),
    month: props.month ? parseInt(props.month) : undefined
  };
  const { loading, error, data } = useQuery<IArticles>(searchArticles, {
    variables: {
      filter: {
        available: 'PUBLISHED',
        date
      }
    }
  });

  let content: JSX.Element | undefined;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    console.error(error);
    content = <p>Error :(</p>;
  }

  if (!content) {
    content =
      !data || data.articles === undefined ? (
        <p>No results</p>
      ) : (
        <>
          {data.articles.map(article => (
            <Synopsis key={article.id} {...article} />
          ))}
        </>
      );
  }

  return <main className={styles.Articles}>{content}</main>;
};
