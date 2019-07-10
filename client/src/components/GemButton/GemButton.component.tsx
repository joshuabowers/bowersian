import * as React from 'react';
import styles from './GemButton.module.css';

interface GemButtonDefaultProps {
  title?: string;
  onClick?: React.MouseEventHandler;
}

export interface GemButtonSingleStateProps extends GemButtonDefaultProps {
  icon: string;
}

export interface GemButtonToggleableProps extends GemButtonDefaultProps {
  from: string;
  to: string;
  toggled?: boolean;
}

const isToggleable = (props: any): props is GemButtonToggleableProps =>
  !!(props as GemButtonToggleableProps).from;

export function GemButton(props: GemButtonSingleStateProps): JSX.Element;
export function GemButton(props: GemButtonToggleableProps): JSX.Element;
export function GemButton(
  props: GemButtonSingleStateProps | GemButtonToggleableProps
) {
  let title = props.title;
  let icon;
  const classes = ['material-icons', styles.GemButton];
  if (isToggleable(props)) {
    const toggled = props.toggled || false;
    const current = toggled ? props.to : props.from;
    title = title || current;
    icon = (
      <div className={styles.icons}>
        <span className={styles.firstIcon}>{props.from}</span>
        <span className={styles.secondIcon}>{props.to}</span>
      </div>
    );
    if (toggled) {
      classes.push(styles.toggled);
    }
  } else {
    title = title || props.icon;
    icon = props.icon;
  }
  return (
    <button className={classes.join(' ')} title={title} onClick={props.onClick}>
      {icon}
    </button>
  );
}
