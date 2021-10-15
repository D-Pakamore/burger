import React, { ChangeEvent, Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

export interface MyProps extends RouteComponentProps {
  ingredients: object;
  price: number;
}

interface ContactDataState {
  loading: boolean;
  orderForm: OrderFormInterface;
  formIsValid: boolean;
}

interface OrderFormInterface {
  [key: string]: {
    [key: string]: {};
    value: string;
    validation: {
      required: boolean;
    };
  };
}

interface FormElementsArrayInterface {
  map(
    arg0: (formElement: {
      config: {
        elementType: string;
        elementConfig: { options: [{ value: string; displayValue: string }] };
        value: string;
        valid: boolean;
        touched: boolean;
      };
      id: string;
    }) => JSX.Element
  ): void;
  push(arg0: {
    id: string;
    config: {
      elementType?: string;
      elementConfig?: { options: [] };
      value: string;
      validation: {
        required: boolean;
      };
    };
  }): void;
}

type OrderFormKey = keyof OrderFormInterface;

class ContactData extends Component<MyProps, ContactDataState> {
  state: ContactDataState = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fasteste" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData: { [key: string]: {} } = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] =
        this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value: string, rules: { required: boolean }) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  }

  inputChangedHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    inputIdentifier: string
  ) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formsIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formsIsValid = updatedOrderForm[inputIdentifier].valid && formsIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formsIsValid });
  };

  render() {
    const formElementsArray: FormElementsArrayInterface = [];
    let key: OrderFormKey;
    for (key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            touched={formElement.config.touched}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            changed={(
              event: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          clicked={this.orderHandler}
          btnType="Success"
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
