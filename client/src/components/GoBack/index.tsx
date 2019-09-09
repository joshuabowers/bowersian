// Based on: https://stackoverflow.com/a/52948007
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './GoBack.module.css';

const GoBack = (props: RouteComponentProps) => (
  <span
    className={['material-icons', styles.GoBack].join(' ')}
    onClick={() => props.history.goBack()}
  >
    arrow_back
  </span>
);

export default withRouter(GoBack);
