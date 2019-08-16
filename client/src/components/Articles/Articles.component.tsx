import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Synopsis } from 'components/Synopsis';
import styles from './Articles.module.css';
import { IArticles } from 'graphql/types/article';

import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Article from 'components/Article';

import Zoom from 'components/Transitions/Zoom.module.css';

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
      <TransitionGroup component={null}>
        <Switch>
          <Route
            exact
            path="/articles/:year/:month/:slug"
            render={props => (
              <Article
                publishedAt={
                  new Date(props.match.params.year, props.match.params.month)
                }
                slug={props.match.params.slug}
              />
            )}
          />
          <Route>
            {data.articles.map(article => (
              <Synopsis key={article.id} {...article} />
            ))}
          </Route>
        </Switch>
      </TransitionGroup>
    );

  return <div className={styles.Articles}>{content}</div>;
};
