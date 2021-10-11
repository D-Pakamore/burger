import { JSXElement } from "@babel/types";
import React, { ClassAttributes, TextareaHTMLAttributes } from "react";
import classes from "./Input.module.css";

interface InputProps {
  elementConfig: {};
  value: string;
  inputElement?: JSXElement;
  elementType: string;
  label?: string;
}

const input = (props: InputProps) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
