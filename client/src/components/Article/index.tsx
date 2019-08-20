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

export const Article = (props: IArticle & RouteComponentProps) => {
  const publishedAt = props.publishedAt && new Date(props.publishedAt);
  const year = publishedAt && publishedAt.getFullYear();
  const month =
    publishedAt && (publishedAt.getMonth() + 1).toString().padStart(2, '0');
  const path = `/articles/${year}/${month}/${props.slug}`;
  console.log(path);
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={props.location.key}
        classNames={{ ...fade }}
        timeout={500}
      >
        <Switch location={props.location}>
          <Route exact path={path}>
            <InDepth {...props} />
          </Route>
          <Route exact path="/articles/:year/:month/:slug">
            <article id={props.slug} />
          </Route>
          <Route render={() => <Synopsis {...props} />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(Article);
