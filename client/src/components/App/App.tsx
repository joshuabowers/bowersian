import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from 'components/Header';
import Breadcrumb from 'components/Breadcrumb';
import { Link, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import apperate from 'components/Transitions/Apperate.module.css';
import fadeSlide from 'components/Transitions/FadeSlide.module.css';
import { LoginForm } from 'components/LoginForm';
import Articles from 'components/Articles';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export interface IAppProps {
  location?: any;
}

export const checkIfLoginVisible = gql`
  query {
    isLoginVisible @client
  }
`;

interface SystemPayload {
  isLoginVisible: boolean;
}

export const App = (props: IAppProps) => {
  const { loading, error, data } = useQuery<SystemPayload>(checkIfLoginVisible);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    console.error(error);
    return <p>Error :(</p>;
  } else if (!data) {
    return <p>Not available</p>;
  }
  return (
    <TransitionGroup className={styles.App}>
      <Header title="Bowersian" key="app-header" />
      {data.isLoginVisible && (
        <CSSTransition
          key="login-form"
          timeout={500}
          classNames={{ ...apperate }}
        >
          <LoginForm />
        </CSSTransition>
      )}
      {/* <Breadcrumb key="breadcrumbs">
        <Link to="/articles/2019">2019</Link>
        <Link to="/articles/2019/07">July</Link>
        <Link to="/articles/2019/07/never-go-that-way">Never Go That Way</Link>
      </Breadcrumb> */}
      <Switch location={props.location}>
        <Route
          path="/articles/:year?/:month?"
          render={props => (
            <Articles
              year={props.match.params.year}
              month={props.match.params.month}
            />
          )}
        />
        <Route path="/" component={Articles} />
      </Switch>
    </TransitionGroup>
  );
};
