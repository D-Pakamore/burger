import React from "react";
import { MyQuantityCheck } from "../../../containers/BurgerBuilder/BurgerBuilder";
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

interface BuildControlsProps {
  // disabled: MyQuantityCheck, disabled interface, needs typeof "keys"
  disabled: any;
  ingredientRemoved(type: string): void;
  ingredientAdded(type: string): void;
}

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props: BuildControlsProps) => (
  <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
      ))}
  </div>
);

export default buildControls;