import React, { MouseEventHandler } from "react";
import classes from './DrawerToggle.module.css';

interface DrawerToggleProps {
  clicked: MouseEventHandler<HTMLDivElement> | undefined;

}

const drawerToggle = (props: DrawerToggleProps) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;

