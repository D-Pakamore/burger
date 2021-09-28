import React, { ReactNode } from "react";
import classes from './NavigationItem.module.css';

interface NavigationItemProps {
  active?: boolean;
  link: string | undefined;
  children: ReactNode;

}

const navigationItem = (props: NavigationItemProps) => (
  <li className={classes.NavigationItem}>
    <a 
      href={props.link} 
      className={props.active ? classes.active : ""}>{props.children}</a>
  </li>
);

export default navigationItem;