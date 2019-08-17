// import React, { useCallback } from 'react';
import React from 'react';
// import { User } from 'store/system/types';
import GemButton from 'components/GemButton';
import styles from './Header.module.css';
import { gql } from 'apollo-boost';
import { IUser } from 'graphql/types/user';
import { useQuery } from '@apollo/react-hooks';

export interface HeaderProps {
  /** The text to display within the header */
  title: string;
}

const getCurrentUser = gql`
  query CurrentUser {
    me {
      id
      email
      displayAs
      isLoggedIn @client
    }
  }
`;

const toggleLoginForm = gql`
  mutation ToggleLoginForm {
    toggleLoginForm @client
  }
`;

const performLogout = gql`
  mutation LogOut {
    logout
  }
`;

interface MePayload {
  me: IUser;
}

// TODO: Correctly implement logout. Possibly needs to reset the
// cache, or manually delete data from the cache. Regardless, cache
// management.
export const Header = (props: HeaderProps) => {
  const { loading, error, data } = useQuery<MePayload>(getCurrentUser);
  if (loading || !data) {
    return <p>Loading...</p>;
  } else if (error) {
    console.error(error);
    return <p>Error</p>;
  }
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
        </li> */}
        <li>
          <GemButton
            from="lock"
            to="lock_open"
            toggled={data.me && data.me.isLoggedIn}
            fromQuery={toggleLoginForm}
            toQuery={performLogout}
            // onClick={handleClick}
          />
        </li>
      </ul>
    </header>
  );
};
