import React, { FunctionComponent } from "react";
import MyAux from "../../hoc/MyAux";
import classes from './LayoutStyle.module.css';



const layout: FunctionComponent = (props) => (
  <MyAux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>
      {props.children}
    </main>
  </MyAux>
);

export default layout;