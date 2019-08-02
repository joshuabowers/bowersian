import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from 'store/system/actions';
import styles from './Login.module.css';

export interface ILoginProps {}

export const LoginForm = (props: ILoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  return (
    <form
      className={styles.LoginForm}
      onSubmit={() => dispatch(logIn.request({ email, password }))}
    >
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