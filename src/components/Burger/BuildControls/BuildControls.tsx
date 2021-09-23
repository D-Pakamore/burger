import React from "react";
import { MyQuantityCheck, QuantityKey } from "../../../containers/BurgerBuilder/BurgerBuilder";
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import IngKey from '../../../containers/BurgerBuilder/BurgerBuilder';

interface BuildControlsProps {
  // disabled: MyQuantityCheck, disabled interface, needs typeof "keys"
  disabled: QuantityKey;
  ingredientRemoved(type: string): void;
  ingredientAdded(type: string): void;
}

const controls: { label: string, type: string }[] = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

interface controlsInterface {
  label: string,
  type: string
}





const buildControls = (props: BuildControlsProps) => (
  <div className={classes.BuildControls}>
      {controls.map((ctrl: controlsInterface) => (
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