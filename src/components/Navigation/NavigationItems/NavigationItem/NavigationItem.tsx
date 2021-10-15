import React, { ReactNode } from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

interface NavigationItemProps {
  active?: boolean;
  link: string;
  children: ReactNode;
}

const navigationItem = (props: NavigationItemProps) => (
  <li className={classes.NavigationItem}>
    <NavLink activeClassName={classes.active} to={props.link} exact>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
