import React, { useState, FormEvent, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql, ExecutionResult } from 'apollo-boost';
import { IUser } from 'graphql/types/user';
import styles from './Login.module.css';

export interface ILoginProps {}

const performLogin = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      displayAs
      isLoggedIn @client
    }
  }
`;

interface LoginPayload {
  login: IUser;
}

export const LoginForm = (props: ILoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logIn, { client, error }] = useMutation<LoginPayload>(performLogin);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        const { data } = (await logIn({
          variables: { email, password }
        })) as ExecutionResult<LoginPayload>;
        if (data && data.login && data.login.isLoggedIn && client) {
          await client.resetStore();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [logIn, client, email, password]
  );

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.error}>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </div>
      )}
      <label htmlFor="login-email">Email</label>
      <input
        type="email"
        name="email"
        id="login-email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor="login-password">Password</label>
      <input
        type="password"
        name="password"
        id="login-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
