import React, { MouseEventHandler } from "react";
import classes from './BuildControl.module.css';

interface thisProps {
  disabled: boolean | undefined;
  removed: MouseEventHandler<HTMLButtonElement> | undefined;
  added: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
}

const buildControl = (props: thisProps) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl