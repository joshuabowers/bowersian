import * as React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Breadcrumb from 'components/Breadcrumb';
import { Link } from 'react-router-dom';
import styles from './App.module.css';
import apperate from 'components/Transitions/Apperate.module.css';
import { LoginForm } from 'components/LoginForm';

export const App = () => {
  const loginVisible = useSelector<AppState, boolean>(
    state => state.system.logInFormVisible
  );
  return (
    <TransitionGroup className={styles.App}>
      <Header title="Bowersian" />
      {loginVisible && (
        <CSSTransition
          key="login-form"
          timeout={500}
          classNames={{ ...apperate }}
        >
          <LoginForm />
        </CSSTransition>
      )}
      <Breadcrumb>
        <Link to="/articles/2019">2019</Link>
        <Link to="/articles/2019/07">July</Link>
        <Link to="/articles/2019/07/placeholder">Placeholder</Link>
      </Breadcrumb>
      <main key="main">
        Main content goes here. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Modi voluptatem ea, at officiis quisquam est velit
        blanditiis ab sit dolores earum nobis a repellendus alias delectus autem
        ullam obcaecati beatae.
      </main>
      <Footer />
    </TransitionGroup>
  );
};
