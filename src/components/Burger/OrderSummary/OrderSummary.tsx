import React, { Component } from "react";
import Aux from "../../../hoc/MyAux/MyAux";
import { MyIngredients } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";

interface OrderSummaryProps {
  price: number;
  purchaseContinued: () => void;
  purchaseCancelled: () => void;
  ingredients: MyIngredients;

  // { ingredients: { [x: string]: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; };
}

class OrderSummary extends Component<OrderSummaryProps> {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>a delicious burger with these ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
