import React from "react";
import { Component } from "react";
import MyAux from "../../hoc/MyAux/MyAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { RouteComponentProps } from "react-router-dom";

export interface MyProps extends RouteComponentProps {}

export interface MyState {
  ingredients: MyIngredients | null;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

export interface MyIngredients {
  [key: string]: number;
}

export type QuantityKey = keyof MyQuantityCheck;

export interface MyQuantityCheck {
  [key: string]: boolean;
}

export type IngKey = keyof MyIngredients;

const INGREDIENT_PRICES: IngredientPricesInterface = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export interface IngredientPricesInterface {
  [key: string]: number;
}

class BurgerBuilder extends Component<MyProps, MyState> {
  state: MyState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-pakamore-burger-default-rtdb.firebaseio.com/Ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients: { [x: string]: number }) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type: IngKey) => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });

    console.log(queryParams);
  };

  removeIngredientHandler = (type: IngKey) => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];

      if (oldCount <= 0) {
        return;
      }

      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledInfo: MyIngredients = {
      ...this.state.ingredients,
    };

    let key: QuantityKey;

    //initializing new object to check if amount is greater then 0
    let quantityCheck: MyQuantityCheck = {
      salad: false,
      bacon: false,
      cheese: false,
      meat: false,
    };

    // changing value to false, if amount is 0 or less
    for (key in disabledInfo) {
      if (disabledInfo[key] <= 0) {
        quantityCheck[key] = true;
      }
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center", fontSize: "32px" }}>
        Ingredients can't be loaded, please try againt later!
      </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <MyAux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={quantityCheck}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </MyAux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <MyAux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </MyAux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
