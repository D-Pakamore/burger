import React, { MouseEventHandler } from "react";
import classes from './Backdrop.module.css'

interface BackdropProps {
  clicked: MouseEventHandler<HTMLDivElement> | undefined;
  show: boolean;
}

const backdrop = (props: BackdropProps) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;
