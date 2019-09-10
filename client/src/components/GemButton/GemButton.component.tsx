import * as React from 'react';
import styles from './GemButton.module.css';
import { useMutation } from '@apollo/react-hooks';

interface IGemButton {
  from: string;
  to: string;
  toggled?: boolean;
  fromQuery?: any;
  toQuery?: any;
  onClick?: React.MouseEventHandler;
}

export const GemButton = (props: IGemButton) => {
  let handleClick = props.onClick;
  const classes = ['material-icons', styles.GemButton];

  const toggled = props.toggled || false;
  const current = toggled ? props.to : props.from;
  const query = toggled ? props.toQuery : props.fromQuery;

  const [performMutation] = useMutation(query);

  if (toggled) {
    classes.push(styles.toggled);
  }
  if (!handleClick && query) {
    handleClick = () => {
      performMutation();
    };
  }

  return (
    <button className={classes.join(' ')} title={current} onClick={handleClick}>
      <div className={styles.icons}>
        <span className={styles.firstIcon}>{props.from}</span>
        <span className={styles.secondIcon}>{props.to}</span>
      </div>
    </button>
  );
};
