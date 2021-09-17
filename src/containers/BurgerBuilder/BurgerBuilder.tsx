import React from "react";
import { Component } from "react";
import MyAux from "../../hoc/MyAux";

class BurgerBuilder extends Component {
  render () {
    return (
      <MyAux>
        <div>Burger</div>
        <div>Build Controls</div>
      </MyAux>
    );
  }
}

export default BurgerBuilder;