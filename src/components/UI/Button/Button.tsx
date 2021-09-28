import React, { ReactNode } from "react";
import classes from './Button.module.css';

interface ButtonInterface {
  btnType: string;
  children: ReactNode;
  clicked(): void;
}

const button = (props: ButtonInterface) => (
  <button className={[classes.Button + " " + classes[props.btnType].concat(' ')].toString()} onClick={props.clicked}>{props.children}</button>
);

export default button;
