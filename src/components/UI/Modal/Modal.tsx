import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/MyAux/MyAux";
import Backdrop from "../Backdrop/Backdrop";

interface ModalProps {
  show: boolean;
  children:
    | boolean
    | React.ReactPortal
    | React.ReactChild
    | React.ReactFragment
    | null
    | undefined;
  modalClosed?(): void;
  clicked?(): void;

  // props: { children: boolean | React.ReactPortal | React.ReactChild | React.ReactFragment | null | undefined; }
}

class Modal extends Component<ModalProps> {
  shouldComponentUpdate(nextProps: ModalProps, NextState: string) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
