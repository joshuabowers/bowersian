import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Synopsis } from 'components/Synopsis';
import styles from './Articles.module.css';
import { IArticles } from 'graphql/types/article';

import { Switch, Route, RouteComponentProps } from 'react-router-dom';
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

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  // TODO: Rewrite this / Article in the following way:
  // 1. Move TransitionGroup into Article.
  // 2. Articles always renders its list, regardless; no conditions.
  // 3. Create a new component for doing full article rendering (e.g.,
  //    what Article is doing now)
  // 4. Article then becomes a three state wrapper around:
  // 4a. InDepth: rendered when the Article exactly matches the current
  //     route
  // 4b. Synopsis: rendered when there is no :slug route param
  // 4c. Nothing: rendered when there is a :slug which doesn't match
  //     this Article.

  const content =
    !data || data.articles === undefined ? (
      <>No results</>
    ) : (
      <TransitionGroup component={null}>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames={{ ...Zoom }}
        >
          <Switch location={props.location}>
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
            <Route
              render={() =>
                data.articles.map(article => (
                  <Synopsis key={article.id} {...article} />
                ))
              }
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );

  return <main className={styles.Articles}>{content}</main>;
};
