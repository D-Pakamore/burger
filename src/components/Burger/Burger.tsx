import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

interface TheseProps {
  ingredients: object;
}

const burger = (props: TheseProps) => {
  const transformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {
    return [...Array(Object.keys(props.ingredients).length)].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}/>;
    })
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
        {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default burger;