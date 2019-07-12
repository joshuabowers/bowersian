import * as React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from './App.module.css';

export const App = () => (
  <div className={styles.App}>
    <Header title="Bowersian" />
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
