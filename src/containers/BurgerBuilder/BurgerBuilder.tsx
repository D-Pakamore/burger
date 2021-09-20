import React from "react";
import { Component } from "react";
import MyAux from "../../hoc/MyAux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    }
  }
  render () {
    return (
      <MyAux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </MyAux>
    );
  }
}

export default BurgerBuilder;