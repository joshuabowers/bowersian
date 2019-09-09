import * as React from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { IArticle } from 'graphql/types/article';
import { Synopsis } from 'components/Synopsis';
import { InDepth } from 'components/InDepth';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import fade from 'components/Transitions/Fade.module.css';
import styles from './Article.module.css';

export const Article = (props: IArticle & RouteComponentProps) => {
  const publishedAt = props.publishedAt && new Date(props.publishedAt);
  const year = publishedAt && publishedAt.getFullYear();
  const month =
    publishedAt && (publishedAt.getMonth() + 1).toString().padStart(2, '0');
  const path = `/articles/${year}/${month}/${props.slug}`;
  return (
    <TransitionGroup className={styles.Article} id={props.slug}>
      <CSSTransition
        key={props.location.key}
        classNames={{ ...fade }}
        timeout={500}
      >
        <Switch location={props.location}>
          <Route exact path={path} render={() => <InDepth {...props} />} />
          <Route
            exact
            path="/articles/:year/:month/:slug"
            render={() => null}
          />
          {/* <Route exact path="/articles/:year/:month/:slug" render={
            () => <article id={props.slug} />
          }/> */}
          <Route render={() => <Synopsis {...props} />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(Article);
