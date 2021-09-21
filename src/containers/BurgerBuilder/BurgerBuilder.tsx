import React from "react";
import { Component } from "react";
import MyAux from "../../hoc/MyAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  // addIngredientHandler = (type: string) => {
  //   const oldCount = this.state.ingredients.type;
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients 
  //   };
  //   updatedIngredients[type] = updatedCount;
  // }
  // https://stackoverflow.com/questions/46987816/using-state-in-react-with-typescript/46987987

  render () {
    return (
      <MyAux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
      </MyAux>
    );
  }
}

export default BurgerBuilder;