// import React, { useCallback } from 'react';
import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppState } from 'store/reducers';
// import { User } from 'store/system/types';
// import { toggleLogInForm, logOut } from 'store/system/actions';
import GemButton from 'components/GemButton';
import styles from './Header.module.css';

export interface HeaderProps {
  /** The text to display within the header */
  title: string;
}

export const Header = (props: HeaderProps) => {
  // const isLoggedIn = useSelector<AppState, boolean>(
  //   state => state.system.loggedIn
  // );
  // const user = useSelector<AppState, User | undefined>(
  //   state => state.system.user
  // );
  // const dispatch = useDispatch();
  // const handleClick = useCallback(() => {
  //   dispatch(isLoggedIn ? logOut.request(user) : toggleLogInForm(undefined));
  // }, [dispatch, isLoggedIn, user]);
  return (
    <header className={styles.Header}>
      <h1>{props.title}</h1>
      <ul>
        {/* <li>
          <GemButton from="add" to="save" />
        </li>
        <li>
          <GemButton
            from="lock"
            to="lock_open"
            // toggled={isLoggedIn}
            // onClick={handleClick}
          />
        </li> */}
      </ul>
    </header>
  );
};
