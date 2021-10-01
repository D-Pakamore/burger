import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

interface TheseProps {
  ingredients: object;
}

const burger = (props: TheseProps) => {
  const transformedIngredientsNames = Object.keys(props.ingredients);
  const transformedIngredientsValues: number[] = Object.values(props.ingredients);
  const ingredientsJsxElements: JSX.Element[] = [];


  if (transformedIngredientsValues.reduce((prev, current) => prev + current) === 0) {
    ingredientsJsxElements.push(<p>Please start adding ingredients!</p>);
  }

  // creating emty arrays with length of given elements
  const ingredientsEmtyArray = transformedIngredientsValues.map(igValue => {
    return [...Array(igValue)]
  })



  //filling my emty array, with ingredient names
  ingredientsEmtyArray.forEach(arr => {
    arr.fill(transformedIngredientsNames[ingredientsEmtyArray.indexOf(arr)]);
  });


  //Initializing Array with JSX elements
  ingredientsEmtyArray.forEach(arr => {
    arr.map((ing, i) => {
      return ingredientsJsxElements.push(<BurgerIngredient key={ing + i} type={ing} />);
    })
  });


  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
        {ingredientsJsxElements}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default burger;
