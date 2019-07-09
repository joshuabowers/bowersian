import * as React from 'react';
import styles from './GemButton.module.css';
import { JSXElement } from '@babel/types';
import { cursorTo } from 'readline';

interface GemButtonDefaultProps {
  title?: string;
}

export interface GemButtonSingleStateProps extends GemButtonDefaultProps {
  icon: string;
}

export interface GemButtonToggleableProps extends GemButtonDefaultProps {
  from: string;
  to: string;
  current?: string;
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
  if (isToggleable(props)) {
    const current = props.current || props.from;
    title = title || current;
    icon = current;
  } else {
    title = title || props.icon;
    icon = props.icon;
  }
  const classes = `material-icons ${styles.GemButton}`;
  return (
    <button className={classes} title={title}>
      {icon}
    </button>
  );
}
