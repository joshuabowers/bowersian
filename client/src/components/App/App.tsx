import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from 'components/Header';

function App() {
  return (
    <div className="App">
      <Header title="Testing HMR" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Testing hot reload. You working? Blah blah
          <br />
          Wake up, Neo.
        </p>
        <p>
          Knock knock.
          <br />
          Who's there.
          <br />
          An interrupting cow.
          <br />
          An interrupting co...
          <br />
          Moooo.
        </p>
      </header>
    </div>
  );
}

export default App;
