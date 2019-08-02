import * as React from 'react';
import styles from './GemButton.module.css';

interface GemButtonDefaultProps {
  title?: string;
  onClick?: React.MouseEventHandler;
}

interface GemButtonSingleStateProps extends GemButtonDefaultProps {
  icon: string;
}

interface GemButtonToggleableProps extends GemButtonDefaultProps {
  from: string;
  to: string;
  toggled?: boolean;
}

export interface IGemButton {
  (props: GemButtonSingleStateProps): JSX.Element;
  (props: GemButtonToggleableProps): JSX.Element;
}

export type TGemButtonProps =
  | GemButtonSingleStateProps
  | GemButtonToggleableProps;

const isToggleable = (props: any): props is GemButtonToggleableProps =>
  !!(props as GemButtonToggleableProps).from;

// export function GemButton(props: GemButtonSingleStateProps): JSX.Element;
// export function GemButton(props: GemButtonToggleableProps): JSX.Element;
// export function GemButton(
//   props: GemButtonSingleStateProps | GemButtonToggleableProps
// ) {

export const GemButton: IGemButton = (
  props: GemButtonSingleStateProps | GemButtonToggleableProps
) => {
  let title = props.title;
  let icon;
  let handleClick = props.onClick;
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
    <button className={classes.join(' ')} title={title} onClick={handleClick}>
      {icon}
    </button>
  );
};
