import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Synopsis } from 'components/Synopsis';
import styles from './Articles.module.css';
import { IArticles } from 'graphql/types/article';

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

export const Articles = (props: ArticlesProps) => {
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

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  const content =
    !data || data.articles === undefined ? (
      <>No results</>
    ) : (
      <>
        {data.articles.map(article => (
          <Synopsis key={article.id} {...article} />
        ))}
      </>
    );

  return <div className={styles.Articles}>{content}</div>;
};
