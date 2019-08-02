import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { toggleLogInForm } from 'store/system/actions';
import GemButton from 'components/GemButton';
import styles from './Header.module.css';

export interface HeaderProps {
  /** The text to display within the header */
  title: string;
}

export const Header = (props: HeaderProps) => {
  const isLoggedIn = useSelector<AppState, boolean>(
    state => state.system.loggedIn
  );
  const dispatch = useDispatch();
  const handleClick = useCallback(e => dispatch(toggleLogInForm(undefined)), [
    dispatch
  ]);
  return (
    <header className={styles.Header}>
      <h1>{props.title}</h1>
      <ul>
        <li>
          <GemButton from="add" to="save" />
        </li>
        <li>
          <GemButton
            from="lock"
            to="lock_open"
            toggled={isLoggedIn}
            onClick={handleClick}
          />
        </li>
      </ul>
    </header>
  );
};
