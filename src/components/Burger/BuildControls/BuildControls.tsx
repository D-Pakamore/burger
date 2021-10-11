import React, { MouseEventHandler } from "react";
import {MyQuantityCheck} from "../../../containers/BurgerBuilder/BurgerBuilder";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

interface BuildControlsProps {
  ordered: MouseEventHandler<HTMLButtonElement> | undefined;
  // disabled: MyQuantityCheck, disabled interface, needs typeof "keys"
  disabled: MyQuantityCheck;
  price: number;
  purchasable: boolean;
  ingredientRemoved(type: string): void;
  ingredientAdded(type: string): void;
}

const controls: { label: string; type: string }[] = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

interface controlsInterface {
  label: string;
  type: string;
}

const buildControls = (props: BuildControlsProps) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl: controlsInterface) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
