import React from "react";
import classes from './BuildControl.module.css';

interface thisProps {
  label: string;
}

const buildControl = (props: thisProps) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
);

export default buildControl