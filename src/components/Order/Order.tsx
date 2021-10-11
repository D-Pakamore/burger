import React from "react";
import classes from "./Order.module.css";

interface OrderProps {
  price: number;
  ingredients: MyIngredients;
}

interface MyIngredients {
  [key: string]: number;
}

const order = (props: OrderProps) => {
  const ingredients = [];

  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      ingName: ingredientsName,
      amount: props.ingredients[ingredientsName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span
    style={{textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px'
  }} 
    key={ig.ingName}>{ig.ingName} ({ig.amount})</span>
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>EUR {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
