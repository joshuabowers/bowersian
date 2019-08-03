import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Breadcrumb from 'components/Breadcrumb';
import { Link, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import apperate from 'components/Transitions/Apperate.module.css';
import fadeSlide from 'components/Transitions/FadeSlide.module.css';
import { LoginForm } from 'components/LoginForm';
import Article from 'components/Article';
import Articles from 'components/Articles';

export interface IAppProps {
  location?: any;
}

export const App = (props: IAppProps) => {
  const loginVisible = useSelector<AppState, boolean>(
    state => state.system.logInFormVisible
  );
  return (
    <TransitionGroup className={styles.App}>
      <Header title="Bowersian" key="app-header" />
      {loginVisible && (
        <CSSTransition
          key="login-form"
          timeout={500}
          classNames={{ ...apperate }}
        >
          <LoginForm />
        </CSSTransition>
      )}
      <Breadcrumb key="breadcrumbs">
        <Link to="/articles/2019">2019</Link>
        <Link to="/articles/2019/07">July</Link>
        <Link to="/articles/2019/07/placeholder">Placeholder</Link>
      </Breadcrumb>
      <CSSTransition
        key={props.location.key}
        timeout={1000}
        classNames={{ ...fadeSlide }}
      >
        <Switch location={props.location}>
          <Route
            exact
            path="/articles/:year/:month/:slug"
            component={Article}
          />
          <Route path="/articles/:year?/:month?" component={Articles} />
          <Route path="/" component={Articles} />
        </Switch>
      </CSSTransition>
      <Footer key="app-footer" />
    </TransitionGroup>
  );
};
