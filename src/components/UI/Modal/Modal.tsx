import React from "react";
import classes from "./Modal.module.css";

const modal = (props: { children: boolean | React.ReactPortal | React.ReactChild | React.ReactFragment | null | undefined; }) => (
  <div className={classes.Modal}>
    {props.children}
  </div>
);

export default modal;