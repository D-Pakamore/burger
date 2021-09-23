import React from "react";
import { Component } from "react";
import MyAux from "../../hoc/MyAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface MyProps {
}

interface MyState {
  ingredients: MyIngredients,
  totalPrice: number
}

interface MyIngredients {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number
}

export type QuantityKey = keyof MyQuantityCheck;


export interface MyQuantityCheck {
  salad: boolean,
  bacon: boolean,
  cheese: boolean,
  meat: boolean
} 

export type IngKey = keyof MyIngredients;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component<MyProps, MyState> {

  state: MyState = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type: IngKey) => {

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients 
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  }

  removeIngredientHandler = (type: IngKey) => {

    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients 
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  }

  render () {

      const disabledInfo: MyIngredients = {
        ...this.state.ingredients
      };

      let key: QuantityKey;
      
      //initializing new object to check if amount is greater then 0
      let quantityCheck: MyQuantityCheck = {
        salad: false,
        bacon: false,
        cheese: false,
        meat: false
      };

      // changing value to false, if amount is 0 or less
      for (key in disabledInfo) {
        if (disabledInfo[key] <= 0) {
          quantityCheck[key] = true;
        }
      }
      
      
    return (
      <MyAux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={quantityCheck}/>
      </MyAux>
    );
  }
}

export default BurgerBuilder;