import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IngredientPricesInterface } from "../BurgerBuilder/BurgerBuilder";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

interface CheckoutProps extends RouteComponentProps {
}



class Checkout extends Component<CheckoutProps> {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1,
    },
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: IngredientPricesInterface = {};
    let price = '';
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
      ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />}
        />
      </div>
    );
  }
}

export default Checkout;
