import * as React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Breadcrumb from 'components/Breadcrumb';
import { Link } from 'react-router-dom';
import styles from './App.module.css';

export const App = () => (
  <div className={styles.App}>
    <Header title="Bowersian" />
    <Breadcrumb>
      <Link to="/articles/2019">2019</Link>
      <Link to="/articles/2019/07">July</Link>
      <Link to="/articles/2019/07/placeholder">Placeholder</Link>
    </Breadcrumb>
    {/* Main content would be subbed out based on routing. So, router here. */}
    <main>
      Main content goes here. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Modi voluptatem ea, at officiis quisquam est velit blanditiis ab sit
      dolores earum nobis a repellendus alias delectus autem ullam obcaecati
      beatae.
    </main>
    <Footer />
  </div>
);
