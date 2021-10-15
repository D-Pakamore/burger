import React, { ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonInterface {
  disabled?: boolean;
  btnType: string;
  children: ReactNode;
  clicked(event: { preventDefault: () => void }): void;
}

const button = (props: ButtonInterface) => (
  <button
    disabled={props.disabled}
    className={[
      classes.Button + " " + classes[props.btnType].concat(" "),
    ].toString()}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
